# **VzdelajSa**

## **Technológie**

### **Frontend**
- **React**: Na vytváranie interaktívneho používateľského rozhrania.
- **DOMPurify**: Na sanitáciu vstupných údajov a ochranu proti XSS útokom.
- **CSS**: Na štýlovanie komponentov a implementáciu responzívneho dizajnu.
- **Axios**: Na vykonávanie HTTP požiadaviek na API.

### **Backend**
- **Java + Spring Boot**: Framework na tvorbu backendu, poskytujúci jednoduchosť, škálovateľnosť a integráciu s inými technológiami.
- **Hibernate (JPA)**: Používa sa ako nástroj na mapovanie objektovo-relačných údajov (ORM) pre prácu s databázou.
- **Lombok**: Zjednodušuje kód generovaním getterov, setterov, konštruktorov a ďalších užitočných metód.
- **Spring Security**: Poskytuje brcypt na hesovanie hesiel.
- **Tomcat**: Zabudovaný server poskytovaný Spring Boot na spustenie aplikácie.

### **Databáza**
- **MySQL**: Používa sa ako relačná databáza, kontajnerizovaná pomocou Dockeru na jednoduché nasadenie.

### **Nástroje**
- **Visual Studio Code**: Primárne vývojové prostredie pre frontend.
- **IntelliJ IDEA Ultimate**: Používa sa na vývoj backendu v jazyku Java.
- **Postman**: Na testovanie API požiadaviek.
- **Docker**: Na spustenie MySQL servera bez manuálneho nastavovania.

---

## **Kľúčové funkcie**
- Responzívny dizajn s dynamickým načítaním CSS.
- Správa používateľov s filtrovaním a triedením.
- Backend implementovaný pomocou Spring Boot s RESTful API.
- Hibernate ako ORM na bezproblémovú interakciu s databázou MySQL.
- Zabudovaný server Tomcat na jednoduché nasadenie a testovanie.
- Kontajnerizovaný MySQL server pomocou Dockeru na jednoduché nastavenie databázy.
- Ochrana proti XSS útokom pomocou DOMPurify.

---

## **Installation**

## **Inštalácia Frontendu**
1. Otvorte aplikaciu Visual Studio Code v subore react_app
2. Otvorte terminál a vložte nasledujúci príkazy:
    ```bash
   npm install
   npm install dompurify

3. Aby spustiť vyuzite prikaz:
    ```bash
   npm start
   
## **Inštalácia BackEndu a Databazy**

### **Krok 1: Inštalácia Dockeru**
1. Nainštalujte si Docker na svoj počítač.
2. Otvorte terminál a vložte nasledujúci príkaz:
   ```bash
   docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=team_password -e MYSQL_DATABASE=team_database -e MYSQL_USER=team_user -e MYSQL_PASSWORD=team_password -p 3307:3306 -d mysql:8.0

Poznámka: Ak sa kontajner nezobrazuje priamo v MySQL, budete musieť server vytvoriť manuálne.

### **Krok 2: Nastavenie MYSQL(V pripade ak as nevotvoril automaticky)**
1. Otvorte MySQL a nastavte pripojenie s nasledujúcimi parametrami:
   Port: 3307
   Používateľské meno: team_user
   Heslo: team_password
   Názov pripojenia: mysql-container
2. Po tomto kroku bude pripojenie vytvorené so schémou team_database.

### **Krok 3: Importovanie databázového dumpu**
1. Prejdite na „Data Import/Restore“ na karte „Administration“.
2. Vyberte možnosť Import from self-contained file.
3. Zadajte súbor team_database_dump.sql ako zdroj na importovanie.
4. Kliknite na „Start Import“ a tabuľky budú automaticky vytvorené.

### **Krok 4: Spustenie BackEnd**
1. Otvorte IntelliJ IDEA.
2. Spustite backend aplikáciu v termináli pomocou nasledujúceho príkazu:
    ```bash
    java -jar target/Task2_BackEnd-1.0-SNAPSHOT.jar


