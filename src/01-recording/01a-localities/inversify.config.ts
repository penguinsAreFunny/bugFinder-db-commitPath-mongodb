import path = require("path");
import {
    BUGFINDER_LOCALITYRECORDER_COMMIT_TYPES, Commit, CommitRecorder, Git, GitImpl,
    GitOptions
} from "bugfinder-localityrecorder-commit";
import {DB, LOCALITY_RECORDING_TYPES, LocalityRecorder} from "bugfinder-framework";
import {MongoDBConfig} from "bugfinder-commit-db-mongodb";
import {
    BUGFINDER_LOCALITYRECORDER_COMMITPATH_TYPES,
    CommitPath,
    CommitPathRecorder
} from "bugfinder-localityrecorder-commitpath";
import {BUGFINDER_DB_COMMITPATH_MONGODB_TYPES, CommitPathsMongoDB} from "bugfinder-commitpath-db-mongodb";
import {localityAContainer} from "bugfinder-framework-defaultcontainer";

const container = localityAContainer;
const projectRoot: string = path.join(process.cwd(), "../repositories/TypeScript")

const gitOptions: GitOptions = {
    baseDir: projectRoot,
    maxConcurrentProcesses: 4
}

const mongoDBConfig: MongoDBConfig = {
    url: "mongodb://localhost:27017",
    dbName: "TEST"
}



// binding localityRecorder and its dependencies
container.bind<LocalityRecorder<CommitPath>>(LOCALITY_RECORDING_TYPES.localityRecorder).to(CommitPathRecorder)
container.bind<LocalityRecorder<Commit>>(BUGFINDER_LOCALITYRECORDER_COMMITPATH_TYPES.commitRecorder).to(CommitRecorder)
// bindings used in CommitRecorder
container.bind<GitOptions>(BUGFINDER_LOCALITYRECORDER_COMMIT_TYPES.gitOptions).toConstantValue(gitOptions)

// binding db and its dependencies
container.bind<DB<CommitPath, any, any>>(LOCALITY_RECORDING_TYPES.db).to(CommitPathsMongoDB);
container.bind<MongoDBConfig>(BUGFINDER_DB_COMMITPATH_MONGODB_TYPES.mongoDBConfig).toConstantValue(mongoDBConfig);

export {container}