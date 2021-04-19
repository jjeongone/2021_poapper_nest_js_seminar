export class BoardDto{
    readonly title: string;
    readonly content: string;
    // readonly user_id: string;    // OneToMany/ManyToOne
    readonly user_ids: string[];    // ManyToMany
}