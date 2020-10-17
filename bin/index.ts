import Express from './app';

const { PORT } = process.env;

Express.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});