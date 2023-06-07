// handler.js-tiedosto on "wrapperi" lambda-funktioille.
// Se mahdollistaa yhtenäisen virheiden käsittelyn ja vastausten muotoilun yhdestä tiedostosta,
// jolloin itse lambda-funktioiden koodi pysyy siistimpänä.

export default function handler(lambda) {
  return async function (event, context) {
    let body, statusCode;

    try {
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e) {
      console.error(e);
      body = { error: e.message };
      statusCode = 500;
    }

    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  };
}
