import mongoose from 'mongoose'
import { type } from 'os';
import database from './../src/Database';

describe('Database connection', () => {
    test('the database.connection is defined', () => {
        expect( database.connection ).toBeDefined( );
    });
});