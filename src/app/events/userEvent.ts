export interface UserEvent {
    id: number,
    _id: number,
    description: string,
    start: Date,
    end: Date,
    userId: number,
    guests: [{
        user: {
            email: String
        },
        status: String
    }],
    owner: {
        email: String
    },
    myStatus: String
}
