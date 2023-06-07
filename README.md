### Serverless Stack (SST)

Serverless Stack (SST) on framework serverless-sovellusten rakentamiseen. Siinä pystytetään AWS:n infrastruktuuri käyttäen Cloud Development Kit (AWS CDK) -teknologiaa, jossa pystytettävät resurssit määritellään luokkina (tässä projektissa JavaScript-luokkina). Deployatessa CDK kääntää koodin CloudFormation templaatiksi.

### Projekti

Projektin päärakenne on seuraava:

<img src="./tree.png">

- frontend-kansio sisältää React-sovelluksen
- packages-kansio sisältää kaksi kansiota:
	- core -> ns. aputiedostoja
	- functions -> lambda-funktiot
- stacks-kansio sisältää infran pystyttämiseen käytetyt CloudFromation-stackit
- sst.config.ts-tiedosto hallinnoi koko sovellusta