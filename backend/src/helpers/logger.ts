import logger from 'pino';

const log = logger({
    base: {
        pid: false
    },
    transport: {
        target: 'pino-pretty'
    }
})

export default log;