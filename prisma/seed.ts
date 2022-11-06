import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "Jonh Doe",
            email: "jd@jd.com.br",
            avatarUrl: "https://github.com/GuilhermeDeOliveiraAmorim.png",
        },
    });

    const pool = await prisma.pool.create({
        data: {
            title: "Pool 01",
            code: "78987",
            ownerId: user.id,
            participants: {
                create: {
                    userId: user.id,
                },
            },
        },
    });

    await prisma.game.create({
        data: {
            date: "2022-11-02T16:00:00.000Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR",
        },
    });

    await prisma.game.create({
        data: {
            date: "2022-11-02T16:00:00.000Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR",

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            },
                        },
                    },
                },
            },
        },
    });
}

main();
