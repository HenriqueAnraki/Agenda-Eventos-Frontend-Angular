export interface UserEvent {
    id: number,
    _id: number,
    description: string,
    start: Date,
    end: Date,
    userId: number,
    guests: [{
        user: {
            _id: number
            email: string
        },
        status: string
    }],
    owner: {
        email: string
    },
    myStatus: string
}
