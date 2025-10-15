export type TokenRecord = {
    token: string; // la chaîne unique du token
    email: string; // email de l'utilisateur
    createdAt: string; // date de création
    usage: { [date: string]: number }; // stocker combien de mots ont été utilisés chaque jour
}