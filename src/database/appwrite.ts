import sdk from 'node-appwrite';
import container from '@/context';
import { AbstractDatabaseClient } from '@/database/index';

export let client = new sdk.Client();

export const initDatabase = async (appwriteDbId: string) => {
    const db = container.get(AbstractDatabaseClient);
    if (!(await isCollectionsInitialized(db.getClient(), appwriteDbId))) {
        await initializeCollections(db.getClient(), appwriteDbId);
    }
};

const isCollectionsInitialized = async (
    databases: sdk.Databases,
    databaseId: string
): Promise<boolean> => {
    try {
        await databases.getCollection(databaseId, 'excercise');
        await databases.getCollection(databaseId, 'plans');
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const initializeCollections = async (
    databases: sdk.Databases,
    databaseId: string
) => {
    const database = await databases.get(databaseId);
    const postsCollection = await databases.createCollection(
        database.$id,
        'Posts',
        'Posts'
    );

    await databases.createStringAttribute(
        database.$id,
        postsCollection.$id,
        'id',
        255,
        true
    );

    await databases.createStringAttribute(
        database.$id,
        postsCollection.$id,
        'userId',
        255,
        true
    );

    const imagesCollection = await databases.createCollection(
        database.$id,
        'Images',
        'Images'
    );

    await databases.createStringAttribute(
        database.$id,
        imagesCollection.$id,
        'id',
        255,
        true
    );

    await databases.createStringAttribute(
        database.$id,
        imagesCollection.$id,
        'publicId',
        255,
        true
    );

    await databases.createStringAttribute(
        database.$id,
        imagesCollection.$id,
        'postId',
        255,
        true
    );

    const usersDataCollection = await databases.createCollection(
        database.$id,
        'UsersData',
        'UsersData'
    );

    await databases.createStringAttribute(
        database.$id,
        usersDataCollection.$id,
        'userId',
        255,
        true
    );

    await databases.createFloatAttribute(
        database.$id,
        usersDataCollection.$id,
        'weight',
        true
    );

    await databases.createFloatAttribute(
        database.$id,
        usersDataCollection.$id,
        'height',
        true
    );
};
