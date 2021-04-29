const stripe = require('stripe')('sk_test_51IlChKFv2R3unXy0Bo2BkJjvOv0XavAC7lEPjyoW3DcFf2u2H1v2oBp41JYY0FCSnbixCf4sprG2ETlZxvT10W4Y00FTIGCWv5');
const prompt = require('prompt')
prompt.start()
async function testPay() {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 360,
        currency: 'usd',
        payment_method_types: ['card'],
        receipt_email: 'jenny.rosen@example.com',
    });
    console.log('Created charge with id: ' + paymentIntent.id)
}

async function testToken( cardNum,cardMnt,cardYear,cardCVC ) {

    const token = await stripe.tokens.create({
        card: {
            number: cardNum,
            exp_month: cardMnt,
            exp_year: cardYear,
            cvc: cardCVC,
        },
    });
    console.log('Created card token with id: ' + token.id)
    testPay()
}

async function getstuff() {
    prompt.message = ''
    let cardNum = await prompt.get('Enter your card number:')
    let cardMnt = await prompt.get('Enter card expiry month: ')
    let cardYear = await prompt.get('Enter card expiry year: ')
    let cardCVC = await prompt.get('Enter card CVC code: ')
    
  testToken ( cardNum['Enter your card number:'], cardMnt['Enter card expiry month: '], cardYear['Enter card expiry year: '], cardCVC['Enter card CVC code: '])
}

getstuff()