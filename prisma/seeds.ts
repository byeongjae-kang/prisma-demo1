import { dbConnect, dbDisconnect, prisma } from '.';

const main = async () => {
  try {
    await dbConnect();

    const result = await prisma.account.create({
      data: {
        email: 'bart@gmail.com',
        password: '1234',
        profile: {
          create: {}
        }
      },
      include: {
        profile: true
      }
    });

    console.log(result);
    // Do something
  } catch (error) {
    // Error handling
    console.log(error);
  } finally {
    await dbDisconnect();
  }
};

main();
