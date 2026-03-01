# Vives Voix
*La vie après la Shoah : un espace numérique collaboratif dédié à la centralisation de la mémoire des survivants et à leurs témoignages.* 

![TailwindCSS](https://ziadoua.github.io/m3-Markdown-Badges/badges/TailwindCSS/tailwindcss3.svg) ![Express](https://ziadoua.github.io/m3-Markdown-Badges/badges/Express/express2.svg) ![Node.js](https://ziadoua.github.io/m3-Markdown-Badges/badges/NodeJS/nodejs3.svg) ![MIT](https://ziadoua.github.io/m3-Markdown-Badges/badges/LicenceMIT/licencemit3.svg)

> *Institué en 1961 par Lucien Paye, ministre de l'Éducation nationale, à la suite d'initiatives d'associations d'anciens résistants et déportés, le CNRD est un concours scolaire qui s'appuie sur l'enseignement de l'histoire, de l'histoire des mémoires, de la Résistance et de la Déportation. Chaque année, un thème est défini. Ce concours est une composante essentielle du parcours citoyen de l'élève. Le thème de la session 2025-2026 du Concours national de la Résistance et de la Déportation est "La fin de la Shoah et de l’univers concentrationnaire nazi. Survivre, témoigner, juger (1944-1948)".*

Ce projet scolaire est une participation au [concours national de la Résistance et de la Déportation](https://www.education.gouv.fr/le-concours-national-de-la-resistance-et-de-la-deportation-465729). Il s'agit de la participation de **Lyna, Camille, Mélina et Adam**, élèves de **Terminale générale** au lycée polyvalent **Jean Perrin** à Marseille.

Ce site a pour but de centraliser des ressources sur la vie des survivants de la Shoah. Des livres aux témoignages, en passant par des musées et des sites institutionnels, nous avons rassemblé une partie de ce qui peut aider à comprendre ce qu'est la Shoah et comment les survivants ont pu vivre après.

Mais la véritable force de ce site est son aspect **collaboratif** et **sécurisé**. Chacun peut proposer des révisions ou des ajouts, mais c'est nous qui validons les modifications après vérifications. Ces modifications peuvent changer le contenu du site, mais aussi son design pour faciliter la compréhension et l'accès à l'information.

## Infrastructure technique

Nous avons choisi de nous tourner vers un backend en **Node** avec **Express**, pour sa facilité. Nous considérions **Next.js**, mais ça serait plus compliqué en sachant que notre projet ne contient en réalité qu'une unique page. Le frontend est quant à lui réalisé avec **TailwindCSS** permettant une mise en page simple mais sublime.

Les informations sont centralisées dans une base de données en JSON, facilement accessible et modifiable. Ce n'est qu'un fichier, vulnérable en cas de corruption en production, mais nous utilisons [Lowdb](https://github.com/typicode/lowdb) pour éviter que le serveur modifie le fichier en même temps que l'administrateur.

### Installation et Mise en service

Pour cloner et lancer ce projet localement, suivez les étapes ci-dessous :

1. **Cloner le site** :
   ```bash
   git clone https://github.com/votre-utilisateur/nom-du-projet.git
   cd nom-du-projet
   ```

2. **Installer les librairies** :
   ```bash
   npm install
   ```

3. **Lancer l'application** :
   ```bash
   npm run build
   npm start
   ```

L'application sera accessible par défaut sur `http://localhost:3000`.

## Contributions

Les ressources utilisées pour la création de ce projet sont toutes explicitées à chaque fin de section. Les sources proviennent principalement de sites institutionnels et de musées reconnus, ainsi que de témoignages de survivants et de leurs descendants.

Si vous souhaitez contribuer au projet :
- Vous pouvez ouvrir une "issue" sur ce dépôt pour proposer une amélioration ou signaler un problème.
- Vous pouvez proposer une "pull request" pour soumettre vos modifications si vous comprenez l'infrastructure technique.

### **Les contributions peuvent être faites pour plusieurs raisons :**
- Proposer des corrections aux ressources déjà existantes (corrections orthographiques, fautes d'orthographe, histoires erronées, etc.)
- Proposer des ajouts (nouvelles ressources, nouvelles fonctionnalités, etc.)
- Ajouter de nouvelles fonctionnalités (utilisation de l'API, etc.)

**Veillez à suivre les [conventions de commits](https://www.conventionalcommits.org/en/v1.0.0/) et à faire vos commits en anglais dans des branches différentes.**


*Si nous utilisons par mégarde des contenus (images ou textes) dont nous ne détenons pas les droits, nous nous en excusons. N'hésitez pas à nous contacter via les **issues** ou par [e-mail](mailto:admin@vivesvoix.fr) pour que nous puissions procéder à leur retrait immédiat.*

## Idées potentielles

1. Un système de contributions intégré permettant de proposer des modifications ou des ajouts sans passer par GitHub → système sécurisé SANS logins mais potentiellement avec des jetons
2. Internationalisation (i18n) pour rendre le site accessible en plusieurs langues.

## Licence

Ce projet est sous licence MIT. Vous pouvez l'utiliser, le modifier et le distribuer librement.
