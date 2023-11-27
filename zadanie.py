import random
import re
import string

class gracz:
    def __init__(this):
        this.nick = input("Podaj swoje imie\n")
        this.kasa = 0
    def dodajkase(this, kasa):
        this.kasa += kasa
    def bankrut(this):
        this.kasa = 0
        print("BANKRUT!")

class odpowiedzi:
    def __init__(this):
        this.informatyka = []
        this.jedzenie = []
        this.natura = []
        this.sport = []
        f = open("informatyka.txt")
        for x in f:
            this.informatyka.append(x.replace('\n', ''))
        f.close()
        f = open("jedzenie.txt")
        for x in f:
            this.jedzenie.append(x.replace('\n', ''))
        f = open("sport.txt")
        for x in f:
            this.sport.append(x.replace('\n', ''))
        f.close()
        f = open("natura.txt")
        for x in f:
            this.natura.append(x.replace('\n', ''))
        f.close()
        this.allowed_categories = ["informatyka", "jedzenie", "natura", "sport"]
        
    def losujpytaniezkategorii(this, category):
        if category == "informatyka":
            rng = random.randrange(0, len(this.informatyka))
            return this.informatyka[rng]
        elif category == "jedzenie":
            rng = random.randrange(0, len(this.jedzenie))
            return this.jedzenie[rng]
        elif category == "natura":
            rng = random.randrange(0, len(this.natura))
            return this.natura[rng]
        else:
            rng = random.randrange(0, len(this.sport))
            return this.sport[rng]
    
    def losujpytanie(this):
        max_allowed = len(this.allowed_categories)
        range = random.randrange(0, max_allowed)
        category = this.allowed_categories[range]
        pytanie = this.losujpytaniezkategorii(category)
        this.allowed_categories.pop(range)
        return pytanie, category
        
class gra:
    def __init__(this):
        this.kolokasa = 0
        this.gracz = gracz()
        this.odpowiedzi = odpowiedzi()
    def losujpytanie(this):
        return this.odpowiedzi.losujpytanie()
    def graj(this):
        regex = "[A-Z]"
        i = 0
        while i < 4:
            guessableletters = list(string.ascii_uppercase)
            i = i + 1
            print("=============\nTERAZ RUNDA " + str(i) + "\n=============")
            mnoznik = i
            if i == 4:
                mnoznik = 10
            print("Mnoznik: x" + str(mnoznik) + "\n")
            pytanie, kategoria = this.losujpytanie()
            pytanie_display = re.sub(regex, "_", pytanie)
            print("KATEGORIA: " + kategoria + "\n")
            print(pytanie_display + "\n")
            errcount = 5
            while True:
                input("Nacisnij ENTER aby zakrecic kolem!")
                this.kolokasa = random.randrange(100, 1001, 100)
                if random.randrange(0, 25) == 0:
                    this.gracz.bankrut()
                    continue
                print("Wylosowales: " + str(this.kolokasa) + " PLN!")
                while True:
                    inp = str(input("Wprowadz litere\n")).upper()
                    if inp not in guessableletters:
                        print("Bledne wejscie / duplikat\n")
                        continue
                    break
                guessableletters.remove(inp)
                itr = re.finditer(inp, pytanie)
                matches = 0
                guessed = False
                for x in itr:
                    #print("test" + str(x.start()) + "test\n")
                    matches += 1
                    pytanie_display = pytanie_display[:x.start()] + inp + pytanie_display[x.start()+1:]
                    guessed = True
                if guessed:
                    zarobione = mnoznik * matches * this.kolokasa
                    print("BRAWO! Zarobiles " + str(zarobione) + " PLN!\n")
                    this.gracz.dodajkase(zarobione)
                elif errcount > 0:
                    errcount -= 1
                    print("Nie trafiles! Pozostala ilosc bledow: " + str(errcount))
                    
                else:
                    print("Wyczerpales limit bledow w jednej rundzie! Koniec gry!")
                    i = 4
                    break
                print(pytanie_display)
                if pytanie_display.find("_") == -1:
                    print("UDALO SIE!! TWOJ STAN KONTA TO " + str(this.gracz.kasa) + " PLN!\n")
                    break
            
        return this.gracz.kasa
    


wynik = gra().graj()
print("KONIEC GRY! TWOJ WYNIK TO " + str(wynik))
