Manager bibliografii integrat cu EasyBib - Tema 23 

Membri: Marius-Octavian Predusca

Specificatii:
    - aplicatie web formata din parte de frontend si backend;
    - utilizare HTML, CSS si Javascript si API-ul de pe site-ul easyBib;
    - aplicatia va comunica cu site-ul easyBib prin fisiere JSON.
    - proiectul va reusi sa stocheze diferite formate de bibliografii, organizandu-le pe mai multe categorii in functie de preferintele utilizatorului, in baza de date;
    - in aplicatie va exista si o sectiune unde se va putea scrie text care va folosi citatele stocate in baza de date sau cu ajutorul site-ului;
    - aplicatia va avea un formular prin care se vor forma bibliografii noi (acest formular va trimite raw data catre easyBib si i se va returna in schimb bibliografia prelucrata);
    - aplicatia va reusi sa diferentieze dintre un citat dintr-un site web, carte, jurnal etc;
    - TODO
    

Descriere:

    Aplicatiile de management de bibliografii au ca scop principal stocarea si organizarea diferitelor referinte ce se pun la finalul citatelor.
    O alta functionalitate este utilizarea mult mai usoara a citatelor in timpul scrierii unui articol, noi trebuind doar sa accesam numele autorului citatului.
(ex. Scriem un citat al lui Mihai Eminescu, noi prin aplicatie doar cautam numele lui in baza de date si ne alegem  datele concrete despre respectivul citat 
intr-un format predefinit de noi).


Instructiuni de folosire:
- pentru a returna toate citatele stocate in baza de date trebuie sa facem un request de tip get la adresa localhost:3000/bibs
- pentru a posta un nou citat facem un post la adresa localhost:3000/bibs (momentan nu am facut campurile required deoarece nu e completa aplicatia)
- pentru un post trebuie ca noile campuri introduse sa corespunda celor predefinite
ex: 
{
		"key": "654321",
        "source": "academy",
        "style": "mla1",
        "book": "the game",
        "main": "poisc",
        "title": "nu va mai fi",
        "publisher": "gigel",
        "city": "bucuresti",
        "year": "3028",
        "funct": "lucartor",
        "first": "ion",
        "middle": "ion",
        "last": "popescu"
        
}
- pentru a vedea toate informatiile despre un citat copiem _id-ul sau si facem un get (ex: localhost:3000/bibs/5c1641ad217aba69925aa09e)
- pentru a edita o bibliografie ne ducem la adresa localhost:3000/bibs/id si facem un req de tip patch cu un obiect json,
inlocuind doar campurile care ne intereseaza 
ex:
{
    "title": "de cand te cunosc"
}

- pentru delete trebuie sa ne ducem la adresa localhost:3000/bibs/id facand un req de tip delete

- pentru a crea un nou cont trebuie sa mergem la adresa localhost:3000/user/signup si sa facem un req de tip post cu urmatorul format json
{
	"email": "example@ase.ro", //trebuie sa fie un email valid cu @
	"password": "123456"
}

- pentru a ne loga mergem la localhost:3000/login si facem un req de tip post cu o adresa deja inregistrata,
dupa ce vom apasa send vom primi un semaj de autentificare reusita si un token, pe care il vom folosi atunci cand vrem sa facem requesturi pentru care
avem nevoie de autorizare ex: delete bib post bib (acum sunt dezactivate)

- pentru a sterge un cont mergem la localhost:3000/id si facem un request de tip delete si cu un token in interiorul unui fisier json
ex:
{
	"email": "example@ase.ro",
	"password": "123456",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAYXNlLnJvIiwidXNlcklkIjoiNWMxZWFlNTUwMTQyNGEwYjM3OTMxNmUwIiwiaWF0IjoxNTQ1NTE0OTQ0LCJleHAiOjE1NDU1MTg1NDR9._JemZEy5u65JFAxmVJ-KkyaiMJPOEAo6WPEdw-AS_1Q"
}


