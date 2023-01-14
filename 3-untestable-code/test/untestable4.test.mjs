import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import argon2 from "@node-rs/argon2";
import { expect } from "chai";

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)


/**
 * TODO use dot-env to hide password
 * Inject a test user with default password to database,
 * then change the password and test it.
 */
describe("Untestable 4: enterprise application", () => {
  let service;
  let users;

  beforeEach(async () => {
    initParameters();
    service = new PasswordService();
    users = PostgresUserDao.getInstance();

    await users.db.query(`DROP TABLE IF EXISTS users;`)
    await users.db.query(
      `CREATE TABLE IF NOT EXISTS users (
        user_id varchar(45) NOT NULL,
        password_hash varchar(450) NOT NULL,
        PRIMARY KEY (user_id)
      );`
    );
    const user1 = {
      'userId': '123',
      'passwordHash': argon2.hashSync('old')

    }
    const user2 = {
      'userId': '321',
      'passwordHash': argon2.hashSync('passwd')

    }
    await users.save(user1);
    await users.save(user2)

  });

  after(() => {
    PostgresUserDao.getInstance().close();
  });

  it("Sucuessful changed the password", async () => {
    const ok = service.changePassword("123", "old", "new");
    expect(ok).to.be.fulfilled;
  });

  it("Failed to change password", async () => {
    const fail = service.changePassword("123", "wrong-old", "new");
    expect(fail).to.be.rejectedWith("wrong old password")

  })
});

function initParameters() {
  process.env.PGUSER = "untestable";
  process.env.PGPASSWORD = "secret";
  process.env.PGDATABASE = "postgres";
  process.env.PGHOST = "127.0.0.1";
  process.env.PGPORT = "5432";
}

