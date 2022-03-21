const request = require('supertest');
const app = require('../app');

describe('GET /', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /fees', function () {
  it('responds with 201 created', function (done) {
    request(app)
      .post('/api/v1/fees')
      .send({
        FeeConfigurationSpec:
          'LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  });
});

describe('POST /fees', function () {
  it('responds 400 Bad Request', function (done) {
    request(app)
      .post('/api/v1/fees')
      .send({
        FeeConfigurationSpec:
          'ANPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
});

describe('POST /compute-transaction-fee', function () {
  it('responds with 200 OK', function (done) {
    request(app)
      .post('/api/v1/compute-transaction-fee')
      .send({
        ID: 91203,
        Amount: 5000,
        Currency: 'NGN',
        CurrencyCountry: 'NG',
        Customer: {
          ID: 2211232,
          EmailAddress: 'anonimized29900@anon.io',
          FullName: 'Abel Eden',
          BearsFee: true,
        },
        PaymentEntity: {
          ID: 2203454,
          Issuer: 'GTBANK',
          Brand: 'MASTERCARD',
          Number: '530191******2903',
          SixID: 530191,
          Type: 'CREDIT-CARD',
          Country: 'NG',
        },
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /compute-transaction-fee', function () {
    it('responds with 400 Bad Request', function (done) {
      request(app)
        .post('/api/v1/compute-transaction-fee')
        .send({
          ID: 91203,
          Amount: '',
          Currency: 'NGN',
          CurrencyCountry: 'NG',
          Customer: {
            ID: 2211232,
            EmailAddress: 'anonimized29900@anon.io',
            FullName: 'Abel Eden',
            BearsFee: true,
          },
          PaymentEntity: {
            ID: 2203454,
            Issuer: 'GTBANK',
            Brand: 'MASTERCARD',
            Number: '530191******2903',
            SixID: 530191,
            Type: 'CREDIT-CARD',
            Country: 'NG',
          },
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });
