import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import { OutgoingHttpHeaders } from 'node:http';
import https from 'node:https';
import mockfs from 'mock-fs';

import { User } from './config_types.js';
import { FileAuth } from './file_auth.js';

describe('FileAuth', () => {
    it('should refresh when null', async () => {
        const auth = new FileAuth();
        (auth as any).token = null;
        const token = 'test';
        mockfs({
            '/path/to/fake/dir': {
                'token.txt': token,
            },
        });
        const user = {
            authProvider: {
                config: {
                    tokenFile: '/path/to/fake/dir/token.txt',
                },
            },
        } as User;

        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;

        await auth.applyAuthentication(user, opts);
        strictEqual(opts.headers.Authorization, `Bearer ${token}`);
        mockfs.restore();
    });
    it('should refresh when expired', async () => {
        const auth = new FileAuth();
        (auth as any).token = 'other';
        (auth as any).lastRead = new Date(1970, 1, 1);
        const token = 'test';
        mockfs({
            '/path/to/fake/dir': {
                'token.txt': token,
            },
        });
        const user = {
            authProvider: {
                config: {
                    tokenFile: '/path/to/fake/dir/token.txt',
                },
            },
        } as User;

        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;

        await auth.applyAuthentication(user, opts);
        strictEqual(opts.headers.Authorization, `Bearer ${token}`);
        mockfs.restore();
    });
    it('should claim correctly', async () => {
        const auth = new FileAuth();
        const token = 'test';
        (auth as any).token = 'other';
        mockfs({
            '/path/to/fake/dir': {
                'token.txt': token,
            },
        });
        const user = {
            authProvider: {
                config: {
                    tokenFile: '/path/to/fake/dir/token.txt',
                },
            },
        } as User;

        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;

        await auth.applyAuthentication(user, opts);
        strictEqual(opts.headers.Authorization, `Bearer ${token}`);

        // Set the file to non-existent, but shouldn't matter b/c token is cached.
        user.authProvider.config.tokenFile = '/non/existent/file/token.txt';

        await auth.applyAuthentication(user, opts);
        strictEqual(opts.headers.Authorization, `Bearer ${token}`);
        mockfs.restore();
    });
});
