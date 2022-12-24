-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 24 nov. 2022 à 00:19
-- Version du serveur : 10.4.25-MariaDB
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `scangf`
--

-- --------------------------------------------------------

--
-- Structure de la table `annonces`
--

CREATE TABLE `annonces` (
  `id_anncs` bigint(20) NOT NULL,
  `id_anncrs` bigint(20) NOT NULL,
  `id_event` bigint(20) NOT NULL DEFAULT 1,
  `description` text CHARACTER SET utf8 NOT NULL,
  `objectif` varchar(50) CHARACTER SET utf8 NOT NULL,
  `type_med` varchar(50) CHARACTER SET utf8 NOT NULL,
  `type_url` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `url_des` text CHARACTER SET utf8 NOT NULL,
  `type_anncs` int(11) NOT NULL DEFAULT 2,
  `duree` int(11) NOT NULL,
  `limite` int(11) DEFAULT NULL,
  `status` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `annonces`
--

INSERT INTO `annonces` (`id_anncs`, `id_anncrs`, `id_event`, `description`, `objectif`, `type_med`, `type_url`, `url_des`, `type_anncs`, `duree`, `limite`, `status`) VALUES
(1, 2, 1, 'Bla bla bla melo gift sur scangift campagne', 'message', 'image', 'whatsapp', 'https://wa.me/22969782863', 2, 3, 0, 'actif'),
(2, 1, 1, 'Bla bla bla SCAN gift sur scangift campagne', 'message', 'image', 'site-web', 'https://mtn.bj/', 2, 3, 0, 'actif'),
(3, 2, 1, 'Bla bla bla melo gift sur scangift campagne', 'message', 'image', 'whatsapp', 'https://wa.me/22969782863', 1, 3, 10, 'actif'),
(4, 1, 1, 'Bla bla bla SCAN gift sur scangift campagne', 'message', 'image', 'site-web', 'https://wa.me/22969782863', 1, 3, 0, 'inactif');

-- --------------------------------------------------------

--
-- Structure de la table `annonceurs`
--

CREATE TABLE `annonceurs` (
  `id_anncrs` bigint(20) NOT NULL,
  `nom_anncrs` varchar(100) CHARACTER SET utf8 NOT NULL,
  `email_anncrs` varchar(150) CHARACTER SET utf8 NOT NULL,
  `tel_anncrs` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `annonceurs`
--

INSERT INTO `annonceurs` (`id_anncrs`, `nom_anncrs`, `email_anncrs`, `tel_anncrs`) VALUES
(1, 'SCANGIFT 1', 'scangift@gmail.com', '+22969782863'),
(2, 'MELO GIFT', 'melogift@gmail.com', '+22899698998');

-- --------------------------------------------------------

--
-- Structure de la table `evenements`
--

CREATE TABLE `evenements` (
  `id_event` bigint(20) NOT NULL,
  `nom_event` varchar(150) CHARACTER SET utf8 NOT NULL,
  `organisator` varchar(100) CHARACTER SET utf8 NOT NULL,
  `datdeb` date NOT NULL,
  `datfin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `evenements`
--

INSERT INTO `evenements` (`id_event`, `nom_event`, `organisator`, `datdeb`, `datfin`) VALUES
(1, 'scangift', 'scangift', '2022-11-19', NULL),
(2, 'holder event', 'holder owner', '2022-11-19', '2022-11-28');

-- --------------------------------------------------------

--
-- Structure de la table `gagner`
--

CREATE TABLE `gagner` (
  `id_gagner` bigint(20) NOT NULL,
  `id_anncs` bigint(20) NOT NULL,
  `id_event` bigint(20) NOT NULL,
  `ref` varchar(10) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `gagner`
--

INSERT INTO `gagner` (`id_gagner`, `id_anncs`, `id_event`, `ref`) VALUES
(1, 1, 1, 'sjf564'),
(2, 2, 1, '45fdjh'),
(3, 3, 1, 'ezugke'),
(4, 3, 1, ''),
(5, 3, 1, ''),
(6, 3, 1, ''),
(7, 3, 1, ''),
(8, 3, 1, 'XqJMF8'),
(9, 3, 1, '£sDOvG'),
(10, 3, 1, 'H(kB$M'),
(11, 3, 1, 'cv0twH'),
(12, 3, 1, '0ZxNpH'),
(13, 3, 1, 'kw-9qn'),
(14, 3, 1, 'NfzKnH'),
(15, 3, 1, 'jIK2SK'),
(16, 3, 1, '&IzNy!'),
(17, 3, 1, 'SQ7qVO'),
(18, 3, 1, '-NSSKg'),
(19, 3, 1, 'l)sXFW'),
(20, 3, 1, 'Nm28sd'),
(21, 3, 1, 'xA1Mnt'),
(22, 3, 1, 'd8aheT'),
(23, 3, 1, 'eQY£bC'),
(24, 4, 1, 'o-3Y6+'),
(25, 4, 1, 'DM(AZX'),
(26, 3, 1, 'L3KGCy'),
(27, 3, 1, '#FIZUo'),
(28, 3, 1, '5eMQuQ'),
(29, 3, 1, 'MT3-rL'),
(30, 3, 1, 'MQehn@'),
(31, 3, 1, '9obDrn'),
(32, 3, 1, 'QQx9o&'),
(33, 3, 1, '!ZZ96u'),
(34, 3, 1, '?W$d&D'),
(35, 3, 1, 'TxEO5$');

-- --------------------------------------------------------

--
-- Structure de la table `media`
--

CREATE TABLE `media` (
  `id_med` bigint(20) NOT NULL,
  `id_anncs` bigint(20) NOT NULL,
  `url_med` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `media`
--

INSERT INTO `media` (`id_med`, `id_anncs`, `url_med`) VALUES
(1, 1, 'https://via.placeholder.com/600/92c952'),
(2, 3, 'https://via.placeholder.com/600/92c952'),
(3, 4, 'https://via.placeholder.com/600/771796'),
(4, 2, 'https://via.placeholder.com/600/24f355'),
(5, 1, 'https://via.placeholder.com/150/f66b97');

-- --------------------------------------------------------

--
-- Structure de la table `stats`
--

CREATE TABLE `stats` (
  `id_stat` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `annonces`
--
ALTER TABLE `annonces`
  ADD PRIMARY KEY (`id_anncs`),
  ADD KEY `FK_Anncrs` (`id_anncrs`),
  ADD KEY `FK_Event` (`id_event`);

--
-- Index pour la table `annonceurs`
--
ALTER TABLE `annonceurs`
  ADD PRIMARY KEY (`id_anncrs`);

--
-- Index pour la table `evenements`
--
ALTER TABLE `evenements`
  ADD PRIMARY KEY (`id_event`);

--
-- Index pour la table `gagner`
--
ALTER TABLE `gagner`
  ADD PRIMARY KEY (`id_gagner`,`id_anncs`,`id_event`),
  ADD KEY `FK_GAnnc` (`id_anncs`),
  ADD KEY `FK_GEvent` (`id_event`);

--
-- Index pour la table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id_med`),
  ADD KEY `FK_Media` (`id_anncs`);

--
-- Index pour la table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id_stat`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `annonces`
--
ALTER TABLE `annonces`
  MODIFY `id_anncs` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `annonceurs`
--
ALTER TABLE `annonceurs`
  MODIFY `id_anncrs` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `evenements`
--
ALTER TABLE `evenements`
  MODIFY `id_event` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `gagner`
--
ALTER TABLE `gagner`
  MODIFY `id_gagner` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `media`
--
ALTER TABLE `media`
  MODIFY `id_med` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `stats`
--
ALTER TABLE `stats`
  MODIFY `id_stat` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `annonces`
--
ALTER TABLE `annonces`
  ADD CONSTRAINT `FK_Anncrs` FOREIGN KEY (`id_anncrs`) REFERENCES `annonceurs` (`id_anncrs`),
  ADD CONSTRAINT `FK_Event` FOREIGN KEY (`id_event`) REFERENCES `evenements` (`id_event`);

--
-- Contraintes pour la table `gagner`
--
ALTER TABLE `gagner`
  ADD CONSTRAINT `FK_GAnnc` FOREIGN KEY (`id_anncs`) REFERENCES `annonces` (`id_anncs`),
  ADD CONSTRAINT `FK_GEvent` FOREIGN KEY (`id_event`) REFERENCES `evenements` (`id_event`);

--
-- Contraintes pour la table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `FK_Media` FOREIGN KEY (`id_anncs`) REFERENCES `annonces` (`id_anncs`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
