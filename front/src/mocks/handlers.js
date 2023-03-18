import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:3001/', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: 'Tea',
                    taste: 'Neutral',
                    category: ['Hot', 'Tea'],
                    creatorId: 'TestUserId',
                    isInFavourites: [
                        'auth0|62124f5c65cd1300687e0b09',
                        'auth0|62fa09037a9349bf5c7bcbf2',
                    ],
                    comments: [],
                    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673174664/tqwa1z58umkjycaz1ibi.jpg',
                    recipe: {
                        ingredients: ['ingr 1', 'ingr2', 'ingr3'],
                        steps: ['step 1', 'step 2', 'step3'],
                        servings: 4,
                    },
                },

                {
                    name: 'Coffee',
                    taste: 'bitter',
                    category: ['Hot'],
                    creatorId: 'auth0|62124f5c65cd1300687e0b09',
                    isInFavourites: [
                        'TestUserId',
                        'auth0|62fa09037a9349bf5c7bcbf2',
                    ],
                    comments: [],
                    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673184834/vpslyl0wccbynknxbx18.jpg',
                    recipe: {
                        ingredients: ['ingr ', 'ingr', 'ingr'],
                        steps: ['step', 'step', 'step'],
                        servings: 2,
                    },
                },
            ])
        );
    }),
    rest.post('http://localhost:3001/', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: 'Tea',
                    taste: 'Neutral',
                    category: ['Hot', 'Tea'],
                    creatorId: 'auth0|62124f5c65cd1300687e0b09',
                    isInFavourites: [
                        'auth0|62124f5c65cd1300687e0b09',
                        'auth0|62fa09037a9349bf5c7bcbf2',
                    ],
                    comments: [],
                    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673174664/tqwa1z58umkjycaz1ibi.jpg',
                    recipe: {
                        ingredients: ['ingr 1', 'ingr2', 'ingr3'],
                        steps: ['step 1', 'step 2', 'step3'],
                        servings: 4,
                    },
                },

                {
                    name: 'Coffee',
                    taste: 'bitter',
                    category: ['Hot'],
                    creatorId: 'auth0|62124f5c65cd1300687e0b09',
                    isInFavourites: [
                        'TestUserId',
                        'auth0|62fa09037a9349bf5c7bcbf2',
                    ],
                    comments: [],
                    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673184834/vpslyl0wccbynknxbx18.jpg',
                    recipe: {
                        ingredients: ['ingr ', 'ingr', 'ingr'],
                        steps: ['step', 'step', 'step'],
                        servings: 2,
                    },
                },
            ])
        );
    }),
    rest.post('http://localhost:3001/addToFavs', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: 'Tea',
                    taste: 'Neutral',
                    category: ['Hot', 'Tea'],
                    creatorId: 'auth0|62124f5c65cd1300687e0b09',
                    isInFavourites: [
                        'TestUserId',
                        'auth0|62124f5c65cd1300687e0b09',
                        'auth0|62fa09037a9349bf5c7bcbf2',
                    ],
                    comments: [],
                    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673174664/tqwa1z58umkjycaz1ibi.jpg',
                    recipe: {
                        ingredients: ['ingr 1', 'ingr2', 'ingr3'],
                        steps: ['step 1', 'step 2', 'step3'],
                        servings: 4,
                    },
                },

                {
                    name: 'Coffee',
                    taste: 'bitter',
                    category: ['Hot'],
                    creatorId: 'auth0|62124f5c65cd1300687e0b09',
                    comments: [],
                    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673184834/vpslyl0wccbynknxbx18.jpg',
                    recipe: {
                        ingredients: ['ingr ', 'ingr', 'ingr'],
                        steps: ['step', 'step', 'step'],
                        servings: 2,
                    },
                },
            ])
        );
    }),
    rest.post('http://localhost:3001/removeFromFavs', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: 'Tea',
                    taste: 'Neutral',
                    category: ['Hot', 'Tea'],
                    creatorId: 'auth0|62124f5c65cd1300687e0b09',
                    isInFavourites: [
                        'auth0|62124f5c65cd1300687e0b09',
                        'auth0|62fa09037a9349bf5c7bcbf2',
                    ],
                    comments: [],
                    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673174664/tqwa1z58umkjycaz1ibi.jpg',
                    recipe: {
                        ingredients: ['ingr 1', 'ingr2', 'ingr3'],
                        steps: ['step 1', 'step 2', 'step3'],
                        servings: 4,
                    },
                },

                {
                    name: 'Coffee',
                    taste: 'bitter',
                    category: ['Hot'],
                    creatorId: 'auth0|62124f5c65cd1300687e0b09',
                    comments: [],
                    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673184834/vpslyl0wccbynknxbx18.jpg',
                    recipe: {
                        ingredients: ['ingr ', 'ingr', 'ingr'],
                        steps: ['step', 'step', 'step'],
                        servings: 2,
                    },
                },
            ])
        );
    }),
    rest.get('http://localhost:3001/random', (req, res, ctx) => {
        const responseObject = {
            name: 'Coffee with cinnamon',
            taste: 'Neutral',
            category: ['Hot', 'Tea'],
            creatorId: 'auth0|62124f5c65cd1300687e0b09',
            isInFavourites: [
                'auth0|62124f5c65cd1300687e0b09',
                'auth0|62fa09037a9349bf5c7bcbf2',
            ],
            comments: [],
            image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673174664/tqwa1z58umkjycaz1ibi.jpg',
            recipe: {
                ingredients: ['ingr 1', 'ingr2', 'ingr3'],
                steps: ['step 1', 'step 2', 'step3'],
                servings: 4,
            },
        };
        return res(ctx.json([responseObject]));
    }),
    rest.post('http://localhost:3001/deleteDrink', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: 'Coffee',
                    taste: 'bitter',
                    category: ['Hot'],
                    creatorId: 'auth0|62124f5c65cd1300687e0b09',
                    isInFavourites: [
                        'TestUserId',
                        'auth0|62fa09037a9349bf5c7bcbf2',
                    ],
                    comments: [],
                    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673184834/vpslyl0wccbynknxbx18.jpg',
                    recipe: {
                        ingredients: ['ingr ', 'ingr', 'ingr'],
                        steps: ['step', 'step', 'step'],
                        servings: 2,
                    },
                },
            ])
        );
    }),
    rest.post('http://localhost:3001/addComment', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: 'Tea',
                    taste: 'bitter',
                    category: ['Hot'],
                    creatorId: 'auth0|62124f5c65cd1300687e0b09',
                    isInFavourites: [
                        'TestUserId',
                        'auth0|62fa09037a9349bf5c7bcbf2',
                    ],
                    comments: [
                        {
                            text: "Hello, it's my first comment",
                            author: 'TestUserId',
                            date: new Date(),
                        },
                    ],
                    image: 'https://res.cloudinary.com/djj8t8knp/image/upload/v1673184834/vpslyl0wccbynknxbx18.jpg',
                    recipe: {
                        ingredients: ['ingr ', 'ingr', 'ingr'],
                        steps: ['step', 'step', 'step'],
                        servings: 2,
                    },
                },
            ])
        );
    }),
];
