// Deklaracja funkcji rekordy
// Ta funkcja pobiera wszystkie ciasteczka,
// i zapisuje nazwę oraz wartość każdego z nich
// do tablicy cookiesarray, którą zwraca
function rekordy()
{
	// Rozdzielenie stringu document.cookie po średnikach
	let cookies = document.cookie.split(";");
	// Deklaracja tablicy
	let cookiesarray = [];
	
	// Wykonaj tę pętlę tyle razy, ile jest ciasteczek
	for(let i=0; i<cookies.length; i+=1)
	{
		// Usuń białe miejsca (spacje)
		let cookie = cookies[i].trim();
		// Podziel ciasteczka na znak =, którym jest oddzielana wartość od nazwy
		let parts = cookie.split("=");
		// Zapisz do tablicy jako name i value
		// Tablicę można odczytać pętlą for
		// tak jak w funkcji salachwaly() pod tą funkcją.
		cookiesarray.push(
		{
			name: parts[0],
			value: parts[1]
		}
		);
	}
	// Zwróć tablicę
	return cookiesarray;
}

// Ta funkcja generuje salę chwały.
// Musi być wywołana w trakcie ładowania dokumentu, gdyż używa ona
// funkcji document.write.
function salachwaly()
{
	// Do zmiennej rekord przypisz zwróconą tablicę z funkcji rekordy()
	let rekord = rekordy();
	// Zmienna pomocnicza do sprawdzenia czy istnieje jakiś rekord
	let printed = false;
	// Wykonaj dla każdego ciasteczka / elementu tablicy rekord
	for(let i=0; i<rekord.length; i+=1)
	{
		// Jeżeli wartość nie jest niezdefiniowana lub jeżeli nazwa ciasteczka nie zaczyna
		// się od znaku ] to pomiń to ciasteczko
		// Jest to konieczne aby ciasteczka z innych stron na tej domenie
		// nie kolidowały z naszymi rekordami.
		if(rekord[i].value == undefined || rekord[i].name.substring(0,1) != "]")
		{
			continue;
		}
		// Pętla wykonała się co najmniej raz z prawidłowym rekordem, ustaw zmienną na true
		printed = true;
		// Napisz ciasteczko na stronie oraz dopisz <br> aby uzyskać nową linię.
		document.write(rekord[i].name.substring(1) + " wygrał " + rekord[i].value + " PLN.<br>");
	}
	// Jeżeli nic się nie wyświetliło (brak plików cookie spełniających nasze warunki)
	// to wyświetl komunikat.
	if(!printed)
	{
		document.write("Brak wyników - zagraj aby dodać wynik!");
	}
}

// Deklaracja klasy gracz
class gracz
{
	// Deklaracja konstruktora klasy
	constructor()
	{
		// Poproś użytkownika o wprowadzenie jego nazwy
		this.nazwagracza = prompt("Podaj swoją nazwe");
		// Stwórz element wyświetlania dla kasy gracza
		this.wyswietlanie_kasa = document.getElementById("kasagracza");
		// Utwórz kasę gracza i przypisz wartość startową 0
		this.kasagracza = 0;
		// Wyświetl wyżej zadeklarowaną kasę gracza używając wyżej
		// zadeklarowanego elementu.
		this.wyswietlanie_kasa.innerHTML = this.kasagracza;
	}
	// Deklaracja metody dla dodawania kasy dla gracza
	dodajkase(kasa, mnoznik)
	{
		// Do kasy gracza dodaj kasę, którą otrzymał pomnożoną przez mnożnik
		this.kasagracza += (kasa * mnoznik);
		// Wyświetl nową kasę
		this.wyswietlanie_kasa.innerHTML = this.kasagracza;
	}
	// Deklaracja metody dla bankruta
	bankrut()
	{
		// Wyzeruj kasę gracza
		this.kasagracza = 0;
		// Wyświetl nowy wyzerowany stan
		this.wyswietlanie_kasa.innerHTML = this.kasagracza;
	}
	// Zwróć kasę gracza
	podajkase()
	{
		return this.kasagracza;
	}
	// Zwróć nazwę gracza
	podajnazwe()
	{
		return this.nazwagracza;
	}
}

// Deklaracja klasy odpowiedzi
class odpowiedzi
{
	// Deklaracja konstruktora
	constructor()
	{
		// Deklaracja możliwych kategorii oraz pytań w nich
		this.informatyka = ["PROGRAMOWANIE", "KLAWIATURA", "PROCESOR", "KOMPUTER"];
		this.jedzenie = ["SPAGHETTI BOLOGNESE", "PIZZA", "FRYTKI", "PIEROGI RUSKIE"];
		this.natura = ["KLON", "DRZEWO IGLASTE", "JEZIORO", "OCEAN SPOKOJNY"];
		this.sport = ["LEWANDOWSKI", "BILARD", "RZUT KARNY", "SPALONY"];
		// Ta zmienna jest potrzebna, gdyż nie chcemy możliwości, gdzie gracz
		// dwa razy dostanie pytanie z tej samej kategorii w trakcie jednej gry.
		this.dopuszczone_kategorie = ["informatyka", "jedzenie", "natura", "sport"];
	}
	// Deklaracja metody do wylosowania pytania z kategorii
	losujpytaniezkategorii(kategoria)
	{
		// Wygeneruj losową cyfrę od 0 do 1 (bez 1)
		let cyfralosowa = Math.random();
		// Pomnóż losową cyfrę przez 4 i pozbądź się przecinka zaokrąglając w dół
		// aby uzyskać losową liczbę od 0 do 3
		
		// Kategorie się nie powtarzają, więc nie ma znaczenia, który indeks wylosujemy
		// pod warunkiem, że ilość pytań w każdej kategorii jest taka sama
		cyfralosowa = Math.floor(cyfralosowa * 4);
		// Switch case dla kategorii do pobrania losowego pytania
		switch(kategoria)
		{
			case "informatyka":
				return this.informatyka[cyfralosowa];
			case "jedzenie":
				return this.jedzenie[cyfralosowa];
			case "natura":
				return this.natura[cyfralosowa];
			case "sport":
				return this.sport[cyfralosowa];
		}
	}
	// Deklaracja metody do wylosowania pytania
	// Tylko ta metoda powinna zostać użyta w celu otrzymania poprawnego pytania z kategorią do naszej gry
	losujpytanie()
	{
		// Sprawdź, ile kategorii niewylosowanych pozostało
		this.dopuszczone_cyfra = this.dopuszczone_kategorie.length;
		// Wylosuj losową cyfrę od 0 do max kategorii - 1
		// -1 musi być gdyż metoda length zwraca ilość rekordów a
		// komputery liczą od zera a nie od jedynki (rekord o numerze zero to też rekord)
		this.zasieg = Math.floor(Math.random() * this.dopuszczone_cyfra);
		// Wylosuj kategorię z dopuszczonych kategorii
		this.kategoria = this.dopuszczone_kategorie[this.zasieg];
		// Wylosuj pytanie z tej kategorii
		this.pytanie = this.losujpytaniezkategorii(this.kategoria);
		// Usuń kategorię, aby nie mogła być brana do następnych rund
		// Najpierw pobierany jest indeks, a potem za pomocą metody splice
		// usuwana jest kategoria o danym indeksie. Jedynka oznacza, że chcemy usunąć
		// tylko raz, gdyż istnieje tylko jedna taka kategoria - każda kategoria
		// jest unikalna.
		this.indexkategorii = this.dopuszczone_kategorie.splice(this.dopuszczone_kategorie.indexOf(this.kategoria), 1);
		return [this.pytanie, this.kategoria];
	}
}

// Deklaracja klasy koło, zarządzającej kołem
class kolo
{
	// Deklaracja konstruktora
	constructor()
	{
		// Do zmiennej przypisz element koło
		this.kolo = document.getElementById("kolo");
	}
	// Deklaracja metody kręć kołem
	kreckolem()
	{
		// Wylosuj losową liczbę od 1.0f do 6.0f bez 6, będzie ona świadczyła o ile
		// obrócimy koło
		let rnd = (Math.random() * 5) + 1;
		// Przywróć koło do pierwotnej pozycji
		this.kolo.style = "transition: all 0s; transform: none";
		// Wykonaj tę funkcję za 50 milisekund, aby koło miało czas na zresetowanie się.
		// Bez tego opóźnienia koło się nie zresetuje mimo linijki wyżej.
		setTimeout( () => 
		{
			// Obróć koło o x razy w 5 sekund ze spowolnieniem pod koniec (ease-out)
			this.kolo.style = "transition: all 5s ease-out; transform: rotate(" + rnd + "turn)";
		}, 50
		)
		// Kalkuluj obroty koła
		// Reszta z dzielenia przez 1 zwróci nam wartość od 0.0f do 1.0f bez 1
		// Dzięki czemu usuwamy pełne obroty koła, np. zamieniamy 5.5 obrotu na 0.5 obrotu
		// Umożliwia nam to dokonanie kalkulacji, gdzie znajduje się wskaźnik koła
		// i dzięki temu możemy określić, ile pieniędzy się wylosowało.
		let kalkulacjakasy = rnd % 1;
		let kasa = 0;
		// Koło jest podzielone na 8 części, więc średnio jedna część zajmuje 0.125 obrotu.
		// Jednakże dzięki ramkom między kwotami, koło nie jest perfekcyjne
		// w związku z czym trzeba minimalnie zmienić niektóre wartości, aby
		// uniknąć skrajności typu "koło jest kilka pikseli od 600 ale i tak dostaliśmy
		// 600"
		// Pozycja startowa koła to między 200 a 300.
		// Koło w grze zawsze obraca się w prawo.
		
		// Nie możemy dać switch case'a, gdyż nie działa on poprawnie ze zmiennymi typu
		// zmiennoprzecinkowego w javascripcie.
		if(kalkulacjakasy < 0.13)
		{
			kasa = 200;
		}
		else if(kalkulacjakasy < 0.25)
		{
			kasa = 100;
		}
		// Przypadek bankruta
		else if(kalkulacjakasy < 0.375)
		{
			kasa = 0;
		}
		else if(kalkulacjakasy < 0.5)
		{
			kasa = 1000;
		}
		else if(kalkulacjakasy < 0.64)
		{
			kasa = 800;
		}
		else if(kalkulacjakasy < 0.76)
		{
			kasa = 600;
		}
		else if(kalkulacjakasy < 0.875)
		{
			kasa = 400;
		}
		else
		{
			kasa = 300;
		}
		// Zwróć kasę
		return kasa;
	}
}

// Deklaracja najważniejszej klasy - gra
class gra
{
	// Konstruktor klasy gra
	constructor()
	{
		// Przygotowanie wielu zmiennych do działania programu,
		// w tym utworzenie nowych klas. Z poziomu głównego skryptu strony,
		// ma ona jedynie tworzyć klasę gra, a klasa zajmie się resztą.
		
		// Zmienna do przechowywania kasy wylosowanej z koła
		this.kolo_kasa = 0;
		// Utwórz klasę mechanizmkoła.
		// Zmienne przechowujące obiekt typu klasa nie mogą mieć takiej
		// samej nazwy co klasa w javascripcie.
		this.mechanizmkola = new kolo();
		// Utwórz klasę graczgry.
		this.graczgry = new gracz();
		// Utwórz klasę generatorpytań.
		this.generatorpytan = new odpowiedzi();
		// Zbierz wszystkie klawisze do jednej zmiennej
		this.klawisze = document.getElementsByClassName("klawiatura_przycisk");
		// Policz ilość klawiszy
		this.klawisze_ilosc = this.klawisze.length;
		// Zmienna do przechowywania obecnego numeru rundy
		this.runda = 0;
		// Przypisz elementy do wyświetlania
		this.wyswietlanie_kategoria = document.getElementById("kategoria");
		this.wyswietlanie_pytanie = document.getElementById("pytanie");
		this.wyswietlanie_nastepnarunda = document.getElementById("nastepnarunda");
		// W przypadku niektórych elementów taki jak ten,
		// zablokuj przycisk bądź odblokuj go.
		this.wyswietlanie_nastepnarunda.removeAttribute("disabled");
		this.wyswietlanie_graj = document.getElementById("graj");
		this.wyswietlanie_graj.setAttribute("disabled", "disabled");
		this.wyswietlanie_kreckolem = document.getElementById("krec");
		this.wyswietlanie_kreckolem.setAttribute("disabled", "disabled");
		this.wyswietlanie_runda = document.getElementById("runda");
		this.wyswietlanie_kasa = document.getElementById("kasa");
		this.wyswietlanie_system = document.getElementById("trafienie");
		this.wyswietlanie_system.innerHTML = "Naciśnij NASTĘPNA RUNDA, aby wylosować kategorię!";
		this.wyswietlanie_koniec = document.getElementById("koniec");
		this.wyswietlanie_koniec.removeAttribute("disabled");
		// Ustaw domyślny regex dla wyszukiwania liter. Na końcu musi być flaga global (g).
		this.regex = /[A-Z]/g;
	}
	// Deklaracja metody do wyświetlania wiadomości systemowych
	wiadomosc(w)
	{
		this.wyswietlanie_system.innerHTML = w;
	}
	// Deklaracja metody do łatwego losowania pytań
	losujpytanie()
	{
		return this.generatorpytan.losujpytanie();
	}
	// Deklaracja metody do następnej rundy
	nastepnarunda()
	{
		// Wywołaj wiadomość systemową
		this.wiadomosc("Zakręć kołem i trzymaj kciuki!");
		// Odblokuj twardo wszystkie klawisze (argument 0)
		this.odblokujklawiature(0);
		// Zablokuj miękko wszystkie klawisze (argument 1)
		// Uniemożliwia to zgadywanie bez zakręcenia kołem
		this.zablokujklawiature(1);
		// Umożliw kręcenie kołem
		this.wyswietlanie_kreckolem.removeAttribute("disabled");
		// Uniemożliw przejście do następnej rundy
		this.wyswietlanie_nastepnarunda.setAttribute("disabled", "disabled");
		// Dodaj 1 do liczby rund
		this.runda += 1;
		// Wyświetl numer rundy
		this.wyswietlanie_runda.innerHTML = this.runda;
		// 0 - pytanie, 1 - kategoria
		this.haslo = this.generatorpytan.losujpytanie();
		// Przypisz kategorię do haslo_kategoria
		this.haslo_kategoria = this.haslo[1];
		// Wyświetl kategorię
		this.wyswietlanie_kategoria.innerHTML = this.haslo_kategoria;
		// Przypisz pytanie do haslo_pytanie
		// Jest to konieczne, gdyż faktyczną odpowiedź chcemy mieć zachowaną w jednej zmiennej,
		// podczas gdy wyświetlana jest druga, ta z ukrytymi literami. Bez zachowania
		// pierwszej zmiennej, nie jesteśmy w stanie odczytać liter i gra by nie działała.
		this.haslo_pytanie = this.haslo[0];
		// Zamień każdą literę regexem na podłogę
		this.haslo_wyswietlanie = this.haslo_pytanie.replace(this.regex, "_");
		// Wyświetl ukryte hasło
		this.wyswietlanie_pytanie.innerHTML = this.haslo_wyswietlanie;
	}
	// Deklaracja metody dla obsługi klawiatury (naciśnięcia klawisza na stronie)
	klawiatura(litera)
	{
		// Jak użytkownik nacisnął jakąś literę, umożliw kręcenie kołem
		this.wyswietlanie_kreckolem.removeAttribute("disabled");
		// Zablokuj daną literę
		this.zablokujlitere(litera);
		// Przygotuj zmienną pomocniczą pod utworzenie regexu
		// w celu sprawdzenia, czy ta litera istnieje w faktycznym haśle
		let regex = "[" + litera + "]";
		// Utwórz regex za pomocą zmiennej pomocniczej, oraz dodaj obowiązkową flagę g
		regex = new RegExp(regex, "g");
		// Sprawdź czy ta litera istnieje - wszystkie znaleziska (matchall)
		let regexmatch = this.haslo_pytanie.matchAll(regex);
		// Domyślnie jest zero matchy
		let matches = 0;
		// Wykonaj pętlę dla każdego matcha
		for(let match of regexmatch)
		{
			// Dodaj jeden do matchy
			matches += 1;
			// Przygotuj nową zmienną do zamienienia hasła z podłóg na literę
			let nowystring = "";
			// Przypisz indeks litery
			let index = match["index"];
			// Dopisz do zmiennej podłogi do momentu matcha
			nowystring = this.haslo_wyswietlanie.substring(0, index);
			// Dopisz znalezioną literę
			nowystring += litera;
			// Dopisz resztę znaków
			nowystring += this.haslo_wyswietlanie.substring(index+1);
			// Podmień zmienną na nową
			this.haslo_wyswietlanie = nowystring;
			// Podmień wyświetlanie
			this.wyswietlanie_pytanie.innerHTML = this.haslo_wyswietlanie;
			//console.log(match["index"]);
			//console.log(match[0]);
			
			//console.log(this.haslo_wyswietlanie);
			//console.log(nowystring);
		}
		// Powiadom funkcję trafienie dla określonej liczby matchy
		this.trafienie(matches);
		// Jeżeli użytkownik trafił to sprawdź czy runda powinna się zakończyć, tzn.
		// czy nie ma już liter do odgadnięcia
		if(matches > 0)
		{
			// Regex dla podłóg
			regex = /[_]/g;
			// Wykonaj regex
			regexmatch = this.haslo_wyswietlanie.match(regex);
			// Jeżeli nie znaleziono żadnej podłogi to zakończ rundę z argumentem 0
			if(regexmatch == null)
			{
				this.zakonczrunde(0);
			}
		}
		else
		{
			// Jeżeli użytkownik nie trafił, wymuś na nim kręcenie kołem poprzez miękkie zablokowanie klawiatury
			this.zablokujklawiature(1);
		}
	}
	// Deklaracja metody trafienie, wykonywanej przy wciśnięciu klawisza przez gracza
	trafienie(ilosc)
	{
		// Jeżeli użytkownik trafił co najmniej jedną literę
		if(ilosc > 0)
		{
			// Wyświetl ile kasy zrobił
			this.wyswietlanie_system.innerHTML = "Trafiłes " + ilosc + " razy, zarabiając " + (ilosc * this.kolo_kasa * this.runda) + "PLN! Zgaduj dalej albo zakręć kołem jeżeli lubisz ryzyko!";
			// Dodaj kasę graczowi
			// Klasa graczgry sama zaktualizuje wyświetlanie stanu bieżącego kasy gracza
			this.graczgry.dodajkase((ilosc * this.kolo_kasa), this.runda);
		}
		else
		{
			// Powiadom użytkownika, że nie trafił
			this.wyswietlanie_system.innerHTML = "Nie trafileś, kręć kołem!";
		}
		
	}
	// Metoda do zakręcenia kołem
	zakrecenie()
	{
		// Przypisz ile użytkownik wylosował z koła do zmiennej
		this.kolo_kasa = this.mechanizmkola.kreckolem();
		// Zablokuj kręcenie kołem
		this.wyswietlanie_kreckolem.setAttribute("disabled", "disabled");
		// Miękko zablokuj klawiaturę
		this.zablokujklawiature(1);
		// Ustaw opóźnienie wyświetlenia kasy oraz odblokowania klawiatury
		// na 5.1 sekundy, gdyż animacja zajmuje 5 sekund i chcemy, aby użytkownik wyczekał do jej końca
		// a nie od razu znał wartość, jaką wylosował
		setTimeout( () =>
		{
			// Jeżeli nie ma bankruta
			if(this.kolo_kasa > 0)
			{
				this.wyswietlanie_kasa.innerHTML = this.kolo_kasa;
				// Miękko odblokuj klawiaturę
				this.odblokujklawiature(1);
				this.wiadomosc("Wybierz literę i licz na szczęście!");
			}
			// Jeżeli bankrut
			else
			{
				// Nie odblokowuj klawiatury, zmuś użytkownika do kręcenia
				this.wyswietlanie_kasa.innerHTML = "BANKRUT!";
				this.wyswietlanie_kreckolem.removeAttribute("disabled");
				// Zresetuj kasę użytkownika
				this.graczgry.bankrut();
				this.wiadomosc("Zakręć kołem i trzymaj kciuki!");
				
			}
		}, 5100
		)
		
		//console.log(this.kolo_kasa);
	}
	// Deklaracja metody zakończrundę
	// Argument force służy do tego, aby natychmiast zakończyć grę.
	// Jest on zawsze ustawiony na 0 i w związku z tym ignorowany,
	// chyba, że użytkownik chce zakończyć grę przedwcześnie
	// za pośrednictwem przycisku zakończ grę,
	// wtedy wyślij argument 1 i zakończ grę
	// niezależnie od liczby pozostałych rund.
	zakonczrunde(force)
	{
		// Twardo zablokuj klawiaturę
		this.zablokujklawiature(0);
		// Wyłącz kręcenie kołem
		this.wyswietlanie_kreckolem.setAttribute("disabled", "disabled");
		// Sprawdź czy jeszcze są rundy i czy użytkownik nie chce natychmiast
		// przerwać gry
		if(this.runda < 4 && force == 0)
		{
			this.wyswietlanie_system.innerHTML = "Nacisnij NASTĘPNA RUNDA, aby wylosować kolejną kategorię!";
			// Odblokuj przycisk następna runda
			this.wyswietlanie_nastepnarunda.removeAttribute("disabled");
		}
		// Zakończ grę, w przypadku braku rund albo chęci zakończenia natychmiastowego
		// przez użytkownika
		else
		{
			// Wyświetl wiadomość systemową
			this.wiadomosc("KONIEC GRY! Wygrałeś " + this.graczgry.podajkase() + " PLN! Możesz zagrać ponownie, naciskając GRAJ!");
			// Zapisz wynik użytkownika jako plik cookie z ważnością 7 dni
			// Część przeglądarek nie wspiera wartości większej niż 7 dni
			// w przypadku ustawiania ciasteczek za pośrednictwem innym niż
			// nagłówki HTML.
			document.cookie = "]" + this.graczgry.podajnazwe() + "=" + this.graczgry.podajkase() + "; max-age=604800; path=/";
			// Zablokuj wszystkie przyciski, oprócz graj aby użytkownik
			// mógł zagrać jeszcze raz
			this.wyswietlanie_koniec.setAttribute("disabled", "disabled");
			this.wyswietlanie_nastepnarunda.setAttribute("disabled", "disabled");
			this.wyswietlanie_kreckolem.setAttribute("disabled", "disabled");
			this.wyswietlanie_graj.removeAttribute("disabled");
		}
	}
	// Metoda do odblokowania klawiatury
	// Przyjmuje ona jeden argument, od którego zależy czy metoda
	// odblokuje klawisze miękko czy twardo.
	// Twardo - odblokuje WSZYSTKIE klawisze niezależnie od ich stanu.
	// Miękko - odblokuje TYLKO te klawisze, które zostały zablokowane miękko.
	// Tabela prawdy:
	// Miękkie odblokowanie nie odblokuje twardego zablokowania.
	// Miękkie odblokowanie odblokuje miękkie zablokowanie.
	// Twarde odblokowanie odblokuje miękkie zablokowanie.
	// Twarde odblokowanie odblokuje twarde zablokowanie.
	
	// Miękkie odblokowanie NIE MA WPŁYWU na klawisze
	// twardo zablokowane.
	// Metody te służą do kontrolowania stanu klawiatury.
	// Przykładowo, jeżeli chcemy wymusić na użytkowniku kręcenie kołem
	// np. gdy uzyskał on bankruta, to nie chcemy
	// po odblokowaniu klawiatury odblokować WSZYSTKICH
	// klawiszy, a tylko te, które jeszcze
	// nie zostały użyte. Do tego właśnie służy
	// miękkie i twarde blokowanie. Miękkiego używamy
	// w trakcie rundy, a twardego między rundami w celu zresetowania
	// stanu klawiatury.
	odblokujklawiature(temp)
	{
		// Twarde odblokowanie
		if(temp === 0)
		{
			for(let i=0; i<this.klawisze_ilosc; i=i+1)
			{
				this.klawisze[i].removeAttribute("disabled");
			}
		}
		// Miękkie odblokowanie
		else
		{
			for(let i=0; i<this.klawisze_ilosc; i=i+1)
			{
				// Odblokuj TYLKO te klawisze, które są miekko zablokowane
				// tzn. mają atrybut disabled ustawiony na 1
				if(this.klawisze[i].getAttribute("disabled") == 1)
				{
					this.klawisze[i].removeAttribute("disabled");
				}
			}
		}
		
	}
	// Metoda do zablokowania klawiatury
	// Przyjmuje ona jeden argument, od którego zależy czy metoda
	// zablokuje klawisze miękko czy twardo.
	// Twardo - blokuje twardo WSZYSTKIE klawisze, niezależnie od ich stanu.
	// Miękko - blokuje miękko TYLKO te klawisze, które są niezablokowane.
	
	// Miękkie zablokowanie NIE MA WPŁYWU na klawisze
	// twardo zablokowane.
	zablokujklawiature(temp)
	{
		// Twarde zablokowanie
		if(temp === 0)
		{
			for(let i=0; i<this.klawisze_ilosc; i=i+1)
			{
				this.klawisze[i].setAttribute("disabled", "disabled");
			}
		}
		// Miękkie zablokowanie
		else
		{
			for(let i=0; i<this.klawisze_ilosc; i=i+1)
			{
				// Zablokuj miękko tylko te klawisze, które nie są twardo zablokowane
				if(this.klawisze[i].getAttribute("disabled") != "disabled")
				{
					this.klawisze[i].setAttribute("disabled", 1);
				}
			}
		}
		
	}
	// Metoda do zablokowania określonej litery
	zablokujlitere(litera)
	{
		// Przygotuj zmienną z nazwą przycisku
		this.dozablokowania = "przycisk_" + litera;
		// Zdobądź element
		this.klawisz = document.getElementById(this.dozablokowania);
		// Twardo zablokuj klawisz
		this.klawisz.setAttribute("disabled", "disabled");
	}
}
// Przygotuj zmienną globalną
let kolofortuny = "";

// Wykonaj tę funkcję w przypadku naciśnięcia przycisku GRAJ
function rozpocznijgre()
{
	// Rozpocznij grę (stworzenie klasy)
	kolofortuny = new gra();
}