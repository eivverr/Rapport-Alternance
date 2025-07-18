---
prev: "Codes | Puzzle54"
next: "Codes | OGCviewer"
---

# Script de restauration des tables de la base de données

```shell
#!/bin/bash
# 
# ------------------------------------------------------------------------------
# Nom du script : restauration_table.sh
# Auteur        : WEIER Loris
# Date          : 13/02/2025
# Version       : 1.0
# Description   : Script pour extraire les données ou la structure d'une table à partir d'une sauvegarde
#                 et les restaurer dans une base de données PostgreSQL
# 
# Usage         : bash restauration_table.sh [nom_bd]
#                 ./restauration_table.sh [nom_bd]
# 
# Options       : -h, --help  afficher l'aide
# 
# Remarque(s)   : Le script doit être exécuté en tant que super utilisateur (sudo)
#                 Le script doit être exécuté dans le répertoire où se trouvent les fichiers de sauvegarde
#                 Les fichiers de sauvegarde doivent être au format *.tar.gz ou *.sql.gz
# 
# Licence       : MIT
# ------------------------------------------------------------------------------

# Variables
nom_bd=""             				# Nom de la base de données (à renseigner lors de l'exécution du script)
rep_copy="./copy_save"      		# Répertoire de copie des fichiers
extensions=('.tar.gz' '.sql.gz')  	# Liste des extensions autorisées

rep_courant=$(pwd)          # Répertoire courant
liste=$(ls)                 # Liste des fichiers

# Variables pour les résultats (laissées vides)
result_schema_list=""       # Liste des schémas de la base de données
result_table_list=""        # Liste des tables d'un schéma

# Constantes pour les couleurs
RED='\033[0;31m'            # Red color
GREEN='\033[0;32m'          # Green color
NC='\033[0m'                # No color

# Fonctions pour afficher du texte en couleur
# $1: texte à afficher
function red_text() {
    echo -e "$RED$1$NC"
}
function green_text() {
    echo -e "$GREEN$1$NC"
}

# Fonction pour afficher un séparateur
function separator_text() {
    echo "--------------------------------------------------------------"
}

# --------------------------------------
# Affichage de l'aide
# --------------------------------------

# Fonction pour afficher l'aide
function afficher_aide() {
    separator_text
    echo -e "Aide du script : restauration_table.sh"
    echo
    echo -e "Usage          : ./restauration_table.sh [nom_bd]"
    echo -e "                 bash restauration_table.sh [nom_bd]"
    echo
    echo -e "Options        : -h, --help  afficher l'aide"
    echo
    echo -e "Description    : Script pour extraire les données ou la structure d'une table à partir d'une sauvegarde"
    echo -e "                 et les restaurer dans une base de données PostgreSQL"
    echo
    echo -e "Remarque(s)    : Le script doit être exécuté en tant que super utilisateur (sudo)"
    echo -e "                 Le script doit être exécuté dans le répertoire où se trouvent les fichiers de sauvegarde"
    echo -e "                 Les fichiers de sauvegarde doivent être au format *.tar.gz ou *.sql.gz"
    separator_text
}

# --------------------------------------
# Fonctions utiles
# --------------------------------------

# Fonction pour vérifier si une extension est autorisée
# $1: extension du fichier
function extension_autorisee() {
	# Vérifie si l'extension du fichier est autorisée
	for ext in "${extensions[@]}"
	do
		if [[ "$1" == *"$ext" ]]
		then
			return 0
		fi
	done

	return 1
}

# Fonction pour afficher la liste des fichiers avec leur numéro
function afficher_liste() {
    i=1
    for element in $liste
    do
        # Si l'extension du fichier est dans la liste des extensions autorisées
        if extension_autorisee $element
        then
            echo "$i. $element"
            i=$((i+1))
        fi
    done
}

# Fonction pour trouver un fichier par son numéro
# $1: numéro du fichier
function trouver_fichier_par_numero() {
    i=1
    for element in $liste
    do
        # Si l'extension du fichier est dans la liste des extensions autorisées et que le numéro correspond
        if [ "$i" -eq "$1" ] && extension_autorisee $element
        then
            echo "$element"
            return 0
        elif extension_autorisee $element
        then
            i=$((i+1))
        fi
    done

    # Si on n'a pas trouvé le fichier, on renvoit le numéro en paramètre
    echo "$1"
    return 1
}

# Fonction pour créer le répertoire de copie s'il n'existe pas
function creer_repertoire_copy() {
    # Verifie si le répertoire de copie existe
    if [ ! -d "$rep_copy" ]
    then
        echo "Répertoire de copie inexistant, répertoire créé: $(green_text $rep_copy)"
        mkdir "$rep_copy"
    fi
}

# --------------------------------------
# Choix de la sauvegarde
# Choix du mode d'extraction
# Choix du schéma et de la table
# --------------------------------------

# Fonction pour choisir une sauvegarde
function choisir_sauvegarde() {
    separator_text
    echo -e "Choisir la sauvegarde souhaitée dans la liste:\n$(afficher_liste)"

    # -e : active l'autocomplétion
    read -e -p "Entrez ici le nom/numéro de la sauvegarde à utiliser: " nom_sauvegarde

    # Si le nom est un numéro, on le convertit en nom de fichier
    if [[ "$nom_sauvegarde" =~ ^[0-9]+$ ]]
    then
        nom_sauvegarde=$(trouver_fichier_par_numero $nom_sauvegarde)
    fi

    # Vérifie que le nom n'est pas vide
    if [ -z "$nom_sauvegarde" ]
    then
        echo -e "$(red_text Error): le nom/numéro de la sauvegarde ne peut pas être vide."
        # On rappelle la fonction pour choisir une sauvegarde
        choisir_sauvegarde
    fi

    # Vérifie l'existence du fichier
    if [ -e "$nom_sauvegarde" ] && [ -f "$nom_sauvegarde" ]
    then
        echo -e "Vous avez sélectionné le fichier: $(green_text $nom_sauvegarde)"
        confirmer_choix
    else
        separator_text
        echo -e "$(red_text Error): pas de fichier '*$extensions' avec le nom/numéro $(green_text $nom_sauvegarde) dans le répertoire, vérifiez l'orthographe !"
        # On rappelle la fonction pour choisir une sauvegarde
        choisir_sauvegarde
    fi
}

# Fonction pour confirmer le choix du fichier
function confirmer_choix() {
    # Demande de confirmation
    read -e -p "Est-ce bien le fichier que vous voulez utiliser ? (O/n) " reponse

    # Si la réponse est vide, on considère que l'utilisateur a confirmé
    reponse=${reponse:-o}

    if [ "$reponse" = "o" ] || [ "$reponse" = "O" ] || [ "$reponse" = "oui" ] || [ "$reponse" = "Oui" ]
    then
        choisir_mode_extraction
    else
        # On rappelle la fonction pour choisir une sauvegarde
        choisir_sauvegarde
    fi
}

# Fonction pour choisir le mode d'extraction
function choisir_mode_extraction() {
    separator_text
    echo -e "Choisir le mode d'extraction:"
    echo -e "1. Extraction des données"
    echo -e "2. Extraction de la structure"
	echo -e "3. Extraction des données et de la structure"
    read -e -p "Entrez ici le numéro du mode d'extraction: " mode_extraction

    case $mode_extraction in
        1)
            echo "Mode d'extraction: $(green_text "Extraction des données")"
            extraction_donnees
            ;;
        2)
            echo "Mode d'extraction: $(green_text "Extraction de la structure")"
            extraction_structure
            ;;
		3)
			echo "Mode d'extraction: $(green_text "Extraction des données et de la structure")"
			extraction_donnees_structure
			;;
        *)
            echo -e "$(red_text Error): le numéro du mode d'extraction est incorrect."
            # On rappelle la fonction pour choisir le mode d'extraction
            choisir_mode_extraction
            ;;
    esac
}

# Fonction pour choisir le nom du schéma
function choisir_nom_schema() {
    separator_text
    echo -e "Saisissez le nom/numéro du schéma de la table à restaurer parmis la liste suivante:"
    get_schema_list
    echo
    read -e -p "Nom/numéro de schéma (public par défaut): " nom_schema

    # Si le nom de schéma est vide, on le remplace par "public"
    nom_schema=${nom_schema:-public}

    # Si le nom est un numéro, on le convertit en nom de schéma
    if [[ "$nom_schema" =~ ^[0-9]+$ ]]
    then
        nom_schema=$(trouver_schema_par_numero $nom_schema)
    fi

    # Vérifie si le nom de schéma existe
    if [ "$nom_schema" != "public" ]
    then
        schema_existe=$(schema_exists $nom_schema)
        if [ "$schema_existe" = false ]
        then
            echo -e "$(red_text Error): le schéma $(green_text $nom_schema) n'existe pas dans la base de données."
            # On rappelle la fonction pour choisir une table
            choisir_nom_schema
        fi
    fi
}

# Fonction pour choisir le nom de la table
function choisir_nom_table() {
    separator_text
    echo -e "Saisissez le nom/numéro de la table à restaurer dans le schéma $(green_text $nom_schema):"
    get_tables_from_schema $nom_schema
    echo
    read -e -p "Nom/numéro de la table: " nom_table

    # Si le nom est un numéro, on convertit en nom de table
    if [[ "$nom_table" =~ ^[0-9]+$ ]]
    then
        nom_table=$(trouver_table_par_numero $nom_table)
    fi

    # Si le nom de la table est vide, on rappelle la fonction pour choisir une table
    if [ -z "$nom_table" ]
    then
        echo -e "$(red_text Error): le nom/numéro de la table ne peut pas être vide."
        choisir_nom_table
    fi

    # Vérifie si le nom de la table existe
    table_existe=$(table_exists $nom_table)
    if [ "$table_existe" = false ]
    then
        echo -e "$(red_text Error): la table $(green_text $nom_table) n'existe pas dans le schéma $(green_text $nom_schema)."
        # On rappelle la fonction pour choisir une table
        choisir_nom_table
    fi
}

# --------------------------------------
# Extraction des données de la table
# --------------------------------------

# Fonction pour extraire les données de la table choisie
function extraction_donnees() {
    choisir_nom_schema
    
    choisir_nom_table

    # On concatène le nom de schéma et le nom de table
    nom_table_complet="$nom_schema.$nom_table"

    # Vérifie que la table est correctement saisie
    # Format: nom_de_schema.nom_de_table
    # Avec des lettres, des chiffres, des tirets et des guillemets
    if [[ "$nom_table_complet" =~ ^[a-zA-Z0-9_\"-]+\.[a-zA-Z0-9_\"-]+$ ]]
    then
        separator_text
        echo -e "La table à restaurer est: $(green_text $nom_table_complet)"
        echo "Extraction des données de la table..."
        extraire_donnees_table
    else
        separator_text
        echo -e "$(red_text Error): le nom du shéma ou de la table est incorrect. Les caractères autorisés sont: lettres (a-z A-Z), chiffres (0-9), tirets (_-) et guillemets (\")."
        echo "Vérifier que le schéma et la table sont correctement saisis ou qu'ils existent dans la base de données."
        # On rappelle la fonction pour choisir une table
        extraction_donnees
    fi
}

# Fonction pour extraire les données de la table
function extraire_donnees_table() {

    nouveau_fichier=""$nom_table"_"$(date +%F)"_data.sql"

    creer_repertoire_copy

    # Commande pour extraire les données de la table
    arg1="/^COPY $nom_table_complet /,/^\\\.$/p"

    # Change la méthode de decompression en fonction de l'extension du fichier
	if [[ "$nom_sauvegarde" == *".tar.gz" ]]
	then
		tar -xO -f "$nom_sauvegarde" |
		sed -n "$arg1" > "$rep_copy/$nouveau_fichier"
	elif [[ "$nom_sauvegarde" == *".sql.gz" ]]
	then
		gunzip -c "$nom_sauvegarde" |
		sed -n "$arg1" > "$rep_copy/$nouveau_fichier"
	fi

    # Vérifie que le fichier a bien été créé et qu'il n'est pas vide
    if [ -e "$rep_copy/$nouveau_fichier" ] && [ -f "$rep_copy/$nouveau_fichier" ] && [ -s "$rep_copy/$nouveau_fichier" ]
    then
        echo "Les données de la table ont été extraites dans le fichier: $(green_text "$rep_copy/$nouveau_fichier")"
        restaurer_donnees
    else
        echo -e "$(red_text Error): impossible d'extraire les données de la table."
        # Supprime le fichier s'il existe
        rm -f $nouveau_fichier
        # On rappelle la fonction pour choisir une table
        extraction_donnees
    fi
}

# --------------------------------------
# Extraction de la structure de la table
# --------------------------------------

# Fonction pour extraire la structure de la table
function extraction_structure() {
    choisir_nom_schema

    choisir_nom_table

    # On concatène le nom de schéma et le nom de table
    nom_table_complet="$nom_schema.$nom_table"

    # Vérifie que la table est correctement saisie
    # Format: nom_de_schema.nom_de_table
    # Avec des lettres, des chiffres, des tirets et des guillemets
    if [[ "$nom_table_complet" =~ ^[a-zA-Z0-9_\"-]+\.[a-zA-Z0-9_\"-]+$ ]]
    then
        separator_text
        echo -e "La table à restaurer est: $(green_text $nom_table_complet)"
        echo "Extraction de la strucutre de la table..."
        extraire_structure_table
    else
        separator_text
        echo -e "$(red_text Error): le nom du shéma ou de la table est incorrect. Les caractères autorisés sont: lettres (a-z A-Z), chiffres (0-9), tirets (_-) et guillemets (\")."
        echo "Vérifier que le schéma et la table sont correctement saisis ou qu'ils existent dans la base de données."
        # On rappelle la fonction pour choisir une table
        extraction_structure
    fi
}

# Fonction pour extraire la structure de la table
function extraire_structure_table() {
    
    nouveau_fichier=""$nom_table"_"$(date +%F)"_struct.sql"

    creer_repertoire_copy

    # Commande pour extraire la structure de la table
    arg1="/^CREATE TABLE $nom_table_complet /,/);/p"

	# Change la méthode de decompression en fonction de l'extension du fichier
	if [[ "$nom_sauvegarde" == *".tar.gz" ]]
	then
		tar -xO -f "$nom_sauvegarde" |
		sed -n "$arg1" > "$rep_copy/$nouveau_fichier"
	elif [[ "$nom_sauvegarde" == *".sql.gz" ]]
	then
		gunzip -c "$nom_sauvegarde" |
		sed -n "$arg1" > "$rep_copy/$nouveau_fichier"
	fi

    # Récupère la date sur le nom de fichier de sauvegarde
    # Retourne la date au format YYYY_MM_DD
    date=$(echo "$nom_sauvegarde" | grep -oP '\d{4}-\d{2}-\d{2}' | sed 's/-/_/g')

	# Nouveau nom de la table
	new_tab_name="$nom_table_complet"_"$date"

    # Modifie le nom de la table dans le fichier
    sed -i "s/$nom_table_complet/"$new_tab_name"/g" "$rep_copy/$nouveau_fichier"

    # Vérifie que le fichier a bien été créé et qu'il n'est pas vide
    if [ -e "$rep_copy/$nouveau_fichier" ] && [ -f "$rep_copy/$nouveau_fichier" ] && [ -s "$rep_copy/$nouveau_fichier" ]
    then
        echo "La structure de la table a été extraite dans le fichier: $(green_text "$rep_copy/$nouveau_fichier")"
        restaurer_structure
    else
        echo -e "$(red_text Error): impossible d'extraire la structure de la table."
        # Supprime le fichier s'il existe
        rm -f $nouveau_fichier
        # On rappelle la fonction pour choisir une table
        extraction_structure
    fi
}

# --------------------------------------
# Extraction des données et de la structure de la table
# --------------------------------------

# Fonction pour extraire les données et la structure de la table
function extraction_donnees_structure() {
	choisir_nom_schema
    
    choisir_nom_table

	# On concatène le nom de schéma et le nom de table
    nom_table_complet="$nom_schema.$nom_table"

    # Vérifie que la table est correctement saisie
    # Format: nom_de_schema.nom_de_table
    # Avec des lettres, des chiffres, des tirets et des guillemets
    if [[ "$nom_table_complet" =~ ^[a-zA-Z0-9_\"-]+\.[a-zA-Z0-9_\"-]+$ ]]
    then
        separator_text
        echo -e "La table à restaurer est: $(green_text $nom_table_complet)"
        echo "Extraction de la strucutre et des données de la table..."
        extraire_donnees_structure_table
    else
        separator_text
        echo -e "$(red_text Error): le nom du shéma ou de la table est incorrect. Les caractères autorisés sont: lettres (a-z A-Z), chiffres (0-9), tirets (_-) et guillemets (\")."
        echo "Vérifier que le schéma et la table sont correctement saisis ou qu'ils existent dans la base de données."
        # On rappelle la fonction pour choisir une table
        extraction_donnees_structure
    fi
}

# Fonction pour extraire les données et la structure de la table
function extraire_donnees_structure_table() {

	nouveau_fichier=""$nom_table"_"$(date +%F)"_struct_data.sql"

    creer_repertoire_copy

    # Commande pour extraire la structure de la table
    arg1="/^CREATE TABLE $nom_table_complet /,/);/p"

	# Commande pour extraire les données de la table
	arg2="/^COPY $nom_table_complet /,/^\\\.$/p"

	# Change la méthode de decompression en fonction de l'extension du fichier
	if [[ "$nom_sauvegarde" == *".tar.gz" ]]
	then
		tar -xO -f "$nom_sauvegarde" | tee temp.sql | sed -n "$arg1" > "$rep_copy/$nouveau_fichier"
		sed -n "$arg2" temp.sql >> "$rep_copy/$nouveau_fichier"
		rm temp.sql
	elif [[ "$nom_sauvegarde" == *".sql.gz" ]]
	then
		gunzip -c "$nom_sauvegarde" | tee temp.sql | sed -n "$arg1" > "$rep_copy/$nouveau_fichier"
		sed -n "$arg2" temp.sql >> "$rep_copy/$nouveau_fichier"
		rm temp.sql
	fi

    # Récupère la date sur le nom de fichier de sauvegarde
    # Retourne la date au format YYYY_MM_DD
    date=$(echo "$nom_sauvegarde" | grep -oP '\d{4}-\d{2}-\d{2}' | sed 's/-/_/g')

    # Modifie le nom de la table dans le fichier
    sed -i "s/$nom_table_complet/"$nom_table_complet"_"$date"/g" "$rep_copy/$nouveau_fichier"

    # Vérifie que le fichier a bien été créé et qu'il n'est pas vide
    if [ -e "$rep_copy/$nouveau_fichier" ] && [ -f "$rep_copy/$nouveau_fichier" ] && [ -s "$rep_copy/$nouveau_fichier" ]
    then
        echo "La structure et les données de la table ont été extraites dans le fichier: $(green_text "$rep_copy/$nouveau_fichier")"
        restaurer_donnees_structure
    else
        echo -e "$(red_text Error): impossible d'extraire la structure et les données de la table."
        # Supprime le fichier s'il existe
        rm -f $nouveau_fichier
        # On rappelle la fonction pour choisir une table
        extraction_donnees_structure
    fi
}

# --------------------------------------
# Connection à la base de données 
# Restauration des données
# Restauration de la structure
# --------------------------------------

# Fonction pour se connecter à la base de données
# $1: commande SQL à exécuter
function connection_db() {
    separator_text

    local cmd="'$1'"
    
    echo "Execution de la commande: sudo su - postgres -c "psql -d "$nom_bd" -c $cmd""
    
    # Exécute la commande et capture la sortie et le statut
    output=$(sudo su - postgres -c "psql -v ON_ERROR_STOP=on -d "$nom_bd" -c $cmd" 2>&1)
    status=$?

    # Vérifie si la commande a été exécutée avec succès
    if [ $status -eq 0 ]
    then
        echo "$output...$(green_text OK)"
    else
        echo -e "$(red_text Error): $output"
        # Retourne le statut pour arrêter le script
        return $status
    fi
}

# Fonction pour restaurer les données
function restaurer_donnees() {
    # Change le schéma de recherche
    connection_db "SET search_path TO public, $nom_schema;" || return 1
    # Supprime les données de la table
    connection_db "TRUNCATE $nom_schema.$nom_table RESTART IDENTITY;" || return 1

    # Chemin absolu du fichier
    local chemin_fichier_absolu=$(realpath "$rep_copy/$nouveau_fichier")
    # echo "Chemin absolu du fichier: $chemin_fichier_absolu"

    # Restaure les données de la table à partir du nouveau fichier créé
    connection_db "\i $chemin_fichier_absolu;" || return 1
}

# Fonction pour restaurer la structure de la table
function restaurer_structure {
    # Chemin absolu du fichier
    local chemin_fichier_absolu=$(realpath "$rep_copy/$nouveau_fichier")
    # echo "Chemin absolu du fichier: $chemin_fichier_absolu"

    # Restaure les données de la table à partir du nouveau fichier créé
    connection_db "\i $chemin_fichier_absolu;" || return 1

	# Change le schéma de recherche
	connection_db "SET search_path TO public, $nom_schema;" || return 1

	# Récupère le propriétaire de la table
	local proprietaire=$(sudo su - postgres -c "psql -d $nom_bd -t -c \"SELECT tableowner FROM pg_tables WHERE tablename = '$nom_table' AND schemaname = '$nom_schema';\"")
	echo "Propriétaire de la table: $proprietaire"

	# Change le propriétaire de la table
	connection_db "ALTER TABLE $new_tab_name OWNER TO $proprietaire;" || return 1

	# Donne les privilèges sur la table
	connection_db "GRANT ALL ON $new_tab_name TO $proprietaire;" || return 1
}

# Fonction pour restaurer les données et la structure de la table
function restaurer_donnees_structure {
	# Chemin absolu du fichier
	chemin_fichier_absolu=$(realpath "$rep_copy/$nouveau_fichier")
	# echo "Chemin absolu du fichier: $chemin_fichier_absolu"

	# Restaure les données de la table à partir du nouveau fichier créé
	connection_db "\i $chemin_fichier_absolu;" || return 1

	# Change le schéma de recherche
	connection_db "SET search_path TO public, $nom_schema;" || return 1

	# Récupère le propriétaire de la table
	local proprietaire=$(sudo su - postgres -c "psql -d $nom_bd -t -c \"SELECT tableowner FROM pg_tables WHERE tablename = '$nom_table' AND schemaname = '$nom_schema';\"")
	echo "Propriétaire de la table: $proprietaire"

	# Change le propriétaire de la table
	connection_db "ALTER TABLE $new_tab_name OWNER TO $proprietaire;" || return 1

	# Donne les privilèges sur la table
	connection_db "GRANT ALL ON $new_tab_name TO $proprietaire;" || return 1
}

# --------------------------------------
# Fonctions pour récupérer les nom des schémas et des tables dans la base de données
# Fonctions pour vérifier l'existence des schémas et des tables
# --------------------------------------

# Fonction pour récupérer la liste des schémas de la base de données
function get_schema_list() {
    # Récupère la liste des schémas de la base de données (sauf schémas système)
    local cmd="\"SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('pg_catalog', 'information_schema') AND schema_name NOT LIKE 'pg_%';\""
    result_schema_list=$(sudo su - postgres -c "psql -d "$nom_bd" -t -c $cmd")

    local count=1
    
    for schema in $result_schema_list
    do
        echo "$count. $schema"
        count=$((count+1))
    done
}

# Fonction pour trouver un schéma par son numéro
# $1: numéro du schéma
function trouver_schema_par_numero() {
    i=1
    for schema in $result_schema_list
    do
        if [ "$i" -eq "$1" ]
        then
            echo "$schema"
            return 0
        else
            i=$((i+1))
        fi
    done

    # Si on n'a pas trouvé le schéma, on renvoit le numéro en paramètre
    echo "$1"
    return 1
}

# Fonction pour vérifier si un schéma existe dans la base de données
# $1: nom du schéma
function schema_exists() {
    exists=false

    # Vérifie si le schéma existe
    for schema in $result_schema_list
    do
        if [ "$schema" = "$1" ]
        then
            exists=true
            break
        fi
    done

    echo $exists
}

# Fonction pour récupérer la liste des tables d'un schéma
# $1: nom du schéma
function get_tables_from_schema() {
    local schema="'$1'"
    local cmd="\"SELECT table_name FROM information_schema.tables WHERE table_schema = $schema;\""

    # Récupère la liste des tables du schéma
    result_table_list=$(sudo su - postgres -c "psql -d "$nom_bd" -t -c $cmd")

    local count=1

    for table in $result_table_list
    do
        echo "$count. $table"
        count=$((count+1))
    done
}

# Fonction pour trouver une table par son numéro
# $1: numéro de la table
function trouver_table_par_numero() {
    i=1
    for table in $result_table_list
    do
        if [ "$i" -eq "$1" ]
        then
            echo "$table"
            return 0
        else
            i=$((i+1))
        fi
    done

    # Si on n'a pas trouvé la table, on renvoit le numéro en paramètre
    echo "$1"
    return 1
}

# Fonction pour vérifier si une table existe dans un schéma
# $1: nom de la table
function table_exists() {
    exists=false

    # Vérifie si la table existe
    for table in $result_table_list
    do
        if [ "$table" = "$1" ]
        then
            exists=true
            break
        fi
    done

    echo $exists
}

# --------------------------------------
# Fonction principale
# --------------------------------------

# Fonction principale
# $1: option saisie par l'utilisateur
function main() {

    # Vérifie si l'utilisateur a saisi une option (ici, -h ou --help)
    if [ "$1" = "-h" ] || [ "$1" = "--help" ]
    then
        afficher_aide
        exit 0  # Fin du script
    fi

	# Vérifie si l'utilisateur a saisi le nom de la base de données
	if [ -z "$1" ]
	then
		echo -e "$(red_text Error): le nom de la base de données est obligatoire."
		exit 1  # Fin du script
	fi

	# Vérifie si l'utilisateur est super utilisateur
	if [ "$EUID" -ne 0 ]
	then
		echo -e "$(red_text Error): le script doit être exécuté en tant que super utilisateur (sudo)."
		exit 1  # Fin du script
	fi

	# Vérifie si le répertoire courant est vide
	if [ -z "$liste" ]
	then
		echo -e "$(red_text Error): le répertoire courant est vide."
		exit 1  # Fin du script
	fi

	# Vérifie si le nom de la base de données est correct
	# Vérifie si la base de données existe
	nom_bd=$1
	local result=$(sudo su - postgres -c "psql -tA -c \"SELECT datname FROM pg_database WHERE datname = '$nom_bd';\"")
	if [ -z "$result" ]
	then
		echo -e "$(red_text Error): la base de données $(green_text $nom_bd) n'existe pas."
		exit 1  # Fin du script
	fi

    echo "Répertoire courant: $rep_courant"
    choisir_sauvegarde
}

# Appel de la fonction principale
main $1

```