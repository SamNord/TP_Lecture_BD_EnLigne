CREATE TABLE [dbo].[Manga]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [titre] VARCHAR(50) NOT NULL, 
    [auteur] VARCHAR(50) NOT NULL, 
    [texte] VARCHAR(MAX) NOT NULL, 	
    [categorieId] INT NOT NULL,
	[urlCover] VARCHAR(MAX) NOT NULL, 
)

CREATE TABLE [dbo].[Categorie]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [type] VARCHAR(50) NOT NULL
)

CREATE TABLE [dbo].[Image]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [urlImage] VARCHAR(MAX) NOT NULL, 
    [mangaId] INT NOT NULL
)


CREATE TABLE [dbo].[Admin]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [identifiant] VARCHAR(50) NOT NULL, 
    [password] VARCHAR(50) NOT NULL
)
