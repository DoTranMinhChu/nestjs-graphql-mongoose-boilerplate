import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(private readonly configService: ConfigService) {
    if (!admin.apps.length) this.setApp();
  }
  private _app!: admin.app.App;

  setApp() {
    try {
      let config = JSON.parse(
        this.configService.get<string>('firebase') || '{}',
      );

      this._app = admin.initializeApp({
        credential: admin.credential.cert(config.credential),
        databaseURL: config.databaseURL,
      });
    } catch (err) {
      console.log('INIT FIREBASE APP ERROR', err);
    }
  }
  getFCMData(data: { title: string; body: string; type: string }) {
    const notification = {
      title: data.title,
      body: data.body,
    };
    const notifyData: any = {
      click_action: 'FLUTTER_NOTIFICATION_CLICK',
      type: data.type,
      //   id: this.item._id.toString(),
    };

    return {
      notification,
      data: notifyData,
      android: {
        priority: 'high',
        notification: { ...notification, sound: 'default' },
        data: notifyData,
      },
      apns: {
        payload: {
          aps: {
            sound: 'sound.aiff',
          },
        },
      },
    };
  }
  get app() {
    if (!this._app) this.setApp();
    return this._app;
  }

  get messaging() {
    return this.app.messaging();
  }
  async verifyIdToken(token: string) {
    try {
      return await admin.auth().verifyIdToken(token);
    } catch (err) {
      console.log('err', err);
      throw new BadRequestException();
    }
  }
  async createUser(email: string, password: string) {
    try {
      return await admin.auth().createUser({
        email: email,
        password: password,
      });
    } catch (err) {
      throw err;
    }
  }
  async updateUser(uid: string, data: admin.auth.UpdateRequest) {
    try {
      return await admin.auth().updateUser(uid, data);
    } catch (err) {
      throw err;
    }
  }
  async deleteUser(uid: string) {
    try {
      return await admin.auth().deleteUser(uid);
    } catch (err) {
      throw err;
    }
  }
  async deleteUsers(uids: string[]) {
    try {
      return await admin.auth().deleteUsers(uids);
    } catch (err) {
      throw err;
    }
  }

  async uploadBuffer(buffer: any, filename: string) {
    const bucket = this.app.storage().bucket();
    const file = bucket.file(filename);
    // var buff = Buffer.from(buffer, 'binary').toString('utf-8');
    try {
      const stream = file.createWriteStream({
        metadata: {
          contentType: 'application/pdf',
        },
      });
      stream.on('error', (err) => {
        console.log('err', err);
      });
      stream.on('finish', () => {
        console.log(filename);
      });
      stream.end(buffer);
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async getFile(filename: string) {
    const file = this.app.storage().bucket().file(filename);
    try {
      return await file.download().catch(() => {
        console.log(`File ${filename} không tồn tại.`);
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
