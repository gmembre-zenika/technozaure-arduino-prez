# FROM PAAS&nbsp;RUN arduino

![Logo Zenika](ressources/logo-zenika.jpg)

 [docker-raspberry-pi-arduino.png]

## Antinomie
- Docker : environnements virtuels, abstraction complète du matériel et logiciel
- Arduino : on est pratiquement dans le proc

# Qu'est ce ?
Arduino Uno
[arduinounosmd2.jpeg]
- Microcontroleur 8 bit @ 16 MHz
 - 32 Ko de Flash
 - 2Ko de SRAM
 - 1Ko de EEPROM
 - 14x I/O digitale (6x PWM, 2x Serie, 4x SPI)
 - 8x entrées analogiques (2x I2C)

# En détails
[arduinounosmd.jpeg]

# Logiciels
- Pas de système d'exploitation
- Uniquement le programme s'exécute dessus.
- Gestion des interruptions à coder si necessaire
- Le debug se fait à coup de reboot et à la LED...
- Pas de BSOD :'(

# Pourquoi ça marche ?
> Il fût un temps où pour programmer un micro controleur, il fallait un microcontroleur programmé...

Problème de la poule et l'oeuf

# Solutions apportées
Arduino intègre sur une même board

 - un programmateur
 - une gestion de port USB
 - microcontroleur de "run"
 
Fournit un SDK + IDE simple d'utilisation libre et gratuit

# Extensions
Shield = carte d'extension se branchant sur les pins de la carte

[shield1.jpeg]
Afficheur digital 4x7 segments

# Shield
[shield2.jpeg]
LCD 2x16 char + bouton
[shield5.jpeg]
Ethernet

et bien d'autres GSM, MIDI, moteur...

# Connexion
- USB avec un PC
 -  Alimentation polyvalente de la carte
 -  Port série émulé sur USB
    - ```cu -l /dev/ttyACM0 -s 115200```
 - Parmi les standards de l'industrie en carte de dev
 - Ré-utilisation importante de (vieux) outils

# Liberté
Schéma de la board libre et opensource

Logiciels libre et opensource :

 - bootloader ( ~ "bios d'un PC" )
 - SDK
 - IDE
Env de dev multiplateforme

# Nombreux clones existant
[bbfuino.jpg]
[SB-Freeduino_v2.3.jpg]

# Exemple de code
```c
// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin 13 as an output.
  pinMode(13, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(13, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);              // wait for a second
  digitalWrite(13, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);              // wait for a second
}
```

# Matériel présenté
Arduino micro
[arduino-micro.jpg]

# Comparatif
|  Plateforme  | CPU                                                       | RAM  | Flash |   |
|-------------|-----------------------------------------------------------|------|-------|---|
| Arduino     | 16 Mhz                                                    | 2 Ko |   32 Ko  |   |
| Rpbi 2      | Arm A7 Quad core@900 Mhz                                          | 1 Go | -     |   |
| S4 GT-I9505 | Arm A15 Quad core @.6 GHz + Arm A7 Quad core@1.2 Ghz + GPU... | 2 Go | 16 Go |   |

# Consommation en Idle
| Plateforme | Idle (W)  | Burn (W)
|------------|-----|-----|
| Arduino    | 0.170 (=> 0.011) | 0.2 |
| Rpbi 2     | 1,1  |  4.5 |

# Rappel des conteneurs
[docker-arch.png]
Ici, ce qui nous interesse est le partage du noyau entre l'hôte et l'invité

# Accès au port série depuis un conteneur
```shell
cu -l /dev/ttyACM0 -s 115200
```
==> mappage de ```/dev/ttyACM0``` de l'hôte dans le conteneur

```shell
docker run -v /dev/ttyACM0:/dev/ttyACM0 monimage
```
Presque...

# Un peu de sécurité
- Fort heuresement, la commande précédente ne passe pas, le conteneur n'a pas les droits suffisants
- Il faut passer en mode **privileged**
```shell
docker run --privileged ...
```
L'option ```--privileged``` coupe toutes les sécurités de runtime appliquée à un conteneur (les namespaces PID, NET, IPC... ne sont plus utilisés)

# Alternative
```shell
docker run --device=/dev/ttyACM0:/dev/ttyACM0 ...
```
L'option ```--device``` mappe le device dans le conteneur avec les droits suffisants pour y accéder (et juste sur ce qui est spécifié)

# IHM et conteneur

