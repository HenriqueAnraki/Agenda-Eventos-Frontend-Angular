export interface UserEvent {
    id: string,
    _id: string,
    description: string,
    start: Date,
    end: Date,
    userId: string,
    guests: [{
        user: {
            _id: string
            email: string
        },
        status: string
    }],
    owner: {
        _id: string
        email: string
    },
    myStatus: string
}
