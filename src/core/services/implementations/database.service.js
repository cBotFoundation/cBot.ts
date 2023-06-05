
class DataBaseService {

    constructor() {

    }

    async init(dependency) {
        this.logger = dependency.get("Logger");
        this.start();
    }

    async dispose() {

    }

    async interval() {

    }

    start() {
        //TODO: MOVE THIS TO PROPPER IMPL
        try {
            mongoose.connect(process.env.DB_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            this.logger.info(`DB Online on: ${process.env.DB_CNN}`);
        } catch (error) {
            this.logger.fatal('DB CONNECTION ERROR:'+error);
        }
    }

    stop() {

    }

    getEngine(engineName) {

    }
}


module.exports = { DataBaseService };