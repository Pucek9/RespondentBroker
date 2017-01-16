Respondent Broker

Use https://angular-meteor.com/ 

To run app server working with local lan mobile devices:
Windows: 
    //set MY_IP=(for /f "tokens=2 delims=[]" %a in ('ping -n 1 -4 "%computername%"') do @echo %a)
    set ROOT_URL=http://%MY_IP%:3000
    meteor run --mobile-server=%ROOT_URL%
Linux: 
    export ROOT_URL=http://MY_IP_ADDRESS:3000
    meteor run --mobile-server=http://MY_IP_ADDRESS:3000
   
f.e.   
set ROOT_URL=http://192.168.0.143:3000
meteor run --mobile-server=%ROOT_URL%

Podczas przystąpienia do badań, został opracowany uniwersalny scenariusz, według którego można zbadać zdalnie użyteczność dowolnej natywnej aplikacji mobilnej, a także każdej innej, w której istnieje możliwość rejestracji wideo poczynań uczestnika. To wszystko za pomocą opracowanego w ramach tej pracy dyplomowej autorskiego narzędzia. Scenariusz wygląda następująco:
1.	Założenie konta na stronie webowej Respondent Broker.
2.	Uzupełnienie swojego profilu o brakujące dane.
3.	W zależności od posiadanej ilości punktów:
    a.	W przypadku braku odpowiedniej ilości punktów, potrzebnych by znaleźć chętnych do przeprowadzenia badania należy je zdobyć. Odbywa się to poprzez bycie uczestnikiem badania użyteczności czyjejś aplikacji i przesłaniu wygenerowanych danych i subiektywnych ocen, wtedy ta osoba przyznaje nam punkty za dobrze wykonane zadanie.
    b.	Jeżeli konto użytkownika zawiera odpowiednią w jego ocenie ilość punktów, aby znaleźć chętnych do przeprowadzenia badania można stworzyć nowy projekt.
4.	Stworzenie nowego projektu i uzupełnienie go o:
    a.	Tytuł.
    b.	Warunki, instrukcje i spis zadań do wykonania.
    c.	Plik instalacyjny aplikacji.
    d.	Link do przygotowanej ankiety
    e.	Zakres punktów możliwy do przyznania uczestnikom, gdzie maksymalna kwota nie może być większa niż liczba punktów posiadanych przez użytkownika.
    f.	Ustawienia konfiguracyjne dodatkowych parametrów mogących się przydać w badaniu jak włączenie komentarza czy oceny dla zadania.
5.	Po odpowiedzeniu przez zadowalającą liczbę respondentów – przejrzenie odpowiedzi wygenerowanie czasów interakcji.
6.	Opracowanie wyników w oparciu o wygenerowane dane
7.	Przyznanie punktów użytkownikom za poświęcony czas.
