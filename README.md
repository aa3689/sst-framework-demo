### Serverless Stack (SST)

Serverless Stack (SST) on framework full-stack-serverless-sovellusten rakentamiseen. Siinä pystytetään AWS:n infrastruktuuri käyttäen Cloud Development Kit (AWS CDK) -teknologiaa, jossa pystytettävät resurssit määritellään nykyaikaisilla ohjelmointikielillä (JS/TS, Python, Java, C#). Deployatessa CDK kääntää koodin CloudFormation templaatiksi.

### Projekti

Projekti toimi Backend 2 -kurssin lopputyönä. Työssä oli tarkoituksena tutustua SST-frameworkiin vastapainona kurssilla käytettyyn serverless-frameworkiin. Projekti toteutettiin SST:n oman tutoriaalin pohjalta: https://sst.dev/guide.html#table-of-contents

Sovelluksen päärakenne on seuraava:

<img src="./tree.png">

- frontend-kansio sisältää React-sovelluksen
- packages-kansio sisältää kaksi kansiota:
	- core -> ns. aputiedostoja
	- functions -> lambda-funktiot
- stacks-kansio sisältää infran pystyttämiseen käytetyt tiedostot, joista ns. tulee CloudFormation-stackeja
- sst.config.ts-tiedosto hallinnoi koko sovellusta