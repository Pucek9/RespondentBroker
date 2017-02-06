import {randomDateString, dateNowString} from './helpers';

const PROJECTS = [
	{
		name: 'Moroni',
		description: `viverra eros feugiat, eget tempor diam bibendum. Aenean at nibh nec quam feugiat hendrerit id at lectus. Ut tincidunt scelerisque interdum. Curabitur sollicitudin tincidunt quam id facilisis. Aliquam mi velit, molestie in tincidunt eget, aliquet quis odio. Phasellus sed porttitor mi, condimentum egestas tellus.
		
Nullam quis volutpat nunc, vitae imperdiet ex. Praesent placerat lectus id eros interdum sollicitudin nec sed leo. Morbi vel velit viverra, fermentum ipsum ut, dictum sem. In semper nibh vel maximus ornare. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer molestie vitae mauris eget dictum. In suscipit augue ut nisl maximus dapibus. Maecenas maximus vel augue quis pellentesque.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'RtfTEHK5scrkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 9, minPoints: 6,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/89BPNCJ',
		ratingTitle: 'You had the pleasure of performing this task?',
		statusActive: true,
		autoDeactivate: false,
		autoDeactivateCount: null,
		multipleResponses: false,
		tasks: [
			{
				name: "task1",
				description: "description 1"
			},
			{
				name: "task2",
				description: "description 2"
			}
		],
	},
	{
		name: 'Simon',
		description: `Pellentesque vitae volutpat arcu, non auctor dolor. Maecenas interdum lacus ac tellus hendrerit volutpat. Donec pharetra tristique scelerisque. Suspendisse suscipit, ex nec varius rutrum, turpis nisl varius metus, at dignissim erat nunc eu neque. Sed fringilla mauris quis arcu efficitur, bibendum efficitur diam pellentesque.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'KJhjaeHJdfkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 10, minPoints: 4,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/HXPCZCZ',
		ratingTitle: 'You had the pleasure of performing this task?',
		statusActive: true,
		autoDeactivate: true,
		autoDeactivateCount: 10,
		multipleResponses: false,
		tasks: [
			{
				name: "task1",
				description: "description 1"
			},
			{
				name: "task2",
				description: "description 2"
			},
			{
				name: "task3",
				description: "description 3"
			},
			{
				name: "task4",
				description: "description 4"
			}
		],
	},
	{
		name: 'Jacob',
		description: `Pellentesque vitae volutpat arcu, non auctor dolor. Maecenas interdum lacus ac tellus hendrerit volutpat. Donec pharetra tristique scelerisque. Suspendisse suscipit, ex nec varius rutrum, turpis nisl varius metus, at dignissim erat nunc eu neque. Sed fringilla mauris quis arcu efficitur, bibendum efficitur diam pellentesque.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'KJhjaeHJdfkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 12, minPoints: 8,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/HXPCZCZ',
		ratingTitle: 'You had the pleasure of performing this task?',
		statusActive: true,
		autoDeactivate: true,
		autoDeactivateCount: 10,
		multipleResponses: false,
		tasks: [
			{
				name: "task1",
				description: "description 1"
			},
			{
				name: "task2",
				description: "description 2"
			}
		],
	},
	{
		name: 'Nephi',
		description: `Pellentesque vitae volutpat arcu, non auctor dolor. Maecenas interdum lacus ac tellus hendrerit volutpat. Donec pharetra tristique scelerisque. Suspendisse suscipit, ex nec varius rutrum, turpis nisl varius metus, at dignissim erat nunc eu neque. Sed fringilla mauris quis arcu efficitur, bibendum efficitur diam pellentesque.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'XasjJHsdkjetewbe',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 16, minPoints: 7,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/89BPNCJ',
		ratingTitle: 'You had the pleasure of performing this task?',
		statusActive: true,
		autoDeactivate: true,
		autoDeactivateCount: 10,
		multipleResponses: false,
		tasks: [
			{
				name: "task1",
				description: "description 1"
			},
		],
	},
	{
		name: 'Christian',
		description: `Vivamus viverra pharetra mauris eget interdum. Morbi consectetur blandit leo. Phasellus mattis nisl et lectus blandit pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sollicitudin porttitor augue. Nulla porta mi neque. Maecenas facilisis eu nibh nec commodo. Suspendisse ullamcorper tempor ipsum, id sagittis lorem efficitur non. Nam id varius eros. In egestas pulvinar urna, nec egestas turpis malesuada vel. Nulla lacinia venenatis enim ac dignissim.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'RtfTEHK5scrkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 12, minPoints: 9,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/HXPCZCZ',
		ratingTitle: 'You had the pleasure of performing this task?',
		statusActive: true,
		autoDeactivate: true,
		autoDeactivateCount: 10,
		multipleResponses: false,
		tasks: [
			{
				name: "task1",
				description: "description 1"
			},
			{
				name: "task2",
				description: "description 2"
			}
		],
	},
	{
		name: 'Tiancum',
		description: `todo`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'RtfTEHK5scrkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 18, minPoints: 3,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/89BPNCJ',
		ratingTitle: 'You had the pleasure of performing this task?',
		statusActive: true,
		autoDeactivate: false,
		multipleResponses: false,
		tasks: [
		{
			name: "task1",
			description: "description 1"
		},
		{
			name: "task2",
			description: "description 2"
		},
			{
				name: "task3",
				description: "description 3"
			}
	],
	},
	{
		name: 'Pedro',
		description: `Pellentesque vitae volutpat arcu, non auctor dolor. Maecenas interdum lacus ac tellus hendrerit volutpat. Donec pharetra tristique scelerisque. Suspendisse suscipit, ex nec varius rutrum, turpis nisl varius metus, at dignissim erat nunc eu neque. Sed fringilla mauris quis arcu efficitur, bibendum efficitur diam pellentesque. Nullam viverra, enim nec consectetur laoreet, augue sem sagittis risus, ut finibus leo magna et odio. Suspendisse potenti. In convallis euismod dolor vitae mollis. Praesent id interdum libero, at vehicula libero.

Vivamus viverra pharetra mauris eget interdum. Morbi consectetur blandit leo. Phasellus mattis nisl et lectus blandit pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sollicitudin porttitor augue. Nulla porta mi neque. Maecenas facilisis eu nibh nec commodo. Suspendisse ullamcorper tempor ipsum, id sagittis lorem efficitur non. Nam id varius eros. In egestas pulvinar urna, nec egestas turpis malesuada vel. Nulla lacinia venenatis enim ac dignissim.

Proin convallis nunc at justo sodales aliquam. Aliquam ullamcorper ligula ligula, in rhoncus elit congue eu. Vivamus facilisis commodo magna. Suspendisse potenti. Morbi sit amet risus ac turpis auctor ultricies. Duis dui lorem, tincidunt ac odio eget, aliquam pulvinar metus. Vivamus id dolor a quam porttitor posuere.`,
		responses: [],
		created: randomDateString(),
		updated: dateNowString(),
		owner: 'RtfTEHK5scrkRZcch',
		isStepRating: true,
		isStepDescription: true,
		maxPoints: 10, minPoints: 2,
		application: '',
		surveyURL: 'https://www.surveymonkey.com/r/89BPNCJ',
		ratingTitle: 'You had the pleasure of performing this task?',
		statusActive: true,
		autoDeactivate: true,
		autoDeactivateCount: 8,
		multipleResponses: false,
		tasks: [
			{
				name: "task1",
				description: "description 1"
			},
			{
				name: "task2",
				description: "description 2"
			},
			{
				name: "task4",
				description: "description 4"
			},
			{
				name: "task5",
				description: "description 5"
			}
		]
	},
	{
		_id: "Tu4JBbLiaKXM2j3aZ",
		name: "Jakdojadę",
		description: "Zadanie przeznaczone jest dla dwóch typów ochotników będących aktualnie we Wrocławiu:\n•\tStacjonarni – przebywający w domowym zaciszu, niepodatni na żadne zakłócenia i czynniki rozpraszające. Osoby takie nagrywają swoją aktywność zgodnie z poniżej zamieszczoną instrukcją. Dla tej grupy osób przewidziana jest nagroda w postaci minimum 7 punktów za wykonanie kompletu zadań.\n•\tMobilni – użytkownicy poruszający się po mieście pieszo lub poprzez korzystanie z komunikacji miejskiej. Ze względu na potrzebę weryfikacji rzeczywistych warunków, proszę uczestników o nagrywanie aktywności wraz z rejestracją wideo przedniej kamery urządzenia. Zamieszczane wideo powinno więc być wygenerowane z serwisu Lookback jako „Combined Video”. Rzetelnie wykonujące zadania osoby z tej grupy zostaną nagrodzone 10 punktami.\n\nWarunki:\n•\tKażde wykonane zadanie powinno być zarejestrowane jako osobny film.\n•\tJako komentarz filmu proszę wpisać typ użytkownika (S – stacjonarny, M – mobilny).\n•\tKażde zadanie zaczyna się od otwarcia głównej aktywności aplikacji, czyli najlepiej zamknąć i uruchomić aplikację od nowa. Dopiero wtedy zacząć nagrywanie. Zakończenie nagrania powinno nastąpić po upewnieniu się, że zadanie zostało zakończone tak, jak przewidział badacz, lub użytkownik nie jest w stanie ukończyć zadania z powodu trudności obsługi aplikacji i zbyt długim błądzeniu.\n•\tW pięciogwiazdkowej skali należy zaznaczyć stopień osobistego odczucia na temat przyswojenia biegłości obsługiwania danej czynności.\n•\tJako komentarz proszę uwzględnić także sugestie odnośnie jakości i ewentualnej poprawy testowanej funkcjonalności, jeśli takie się nasunęły podczas jej używania.\n•\tProszę uzupełnić zamieszczoną ankietę i podpisać ją swoim adresem email jako identyfikatorem.\n\nSurvey for English users:\nhttps://www.esurveycreator.com/s/667d49a",
		minPoints: 7,
		maxPoints: 10,
		isStepRating: true,
		isStepDescription: true,
		owner: "9X285yQzusTQwteYv",
		responses: [],
		created: "2017/01/16 02:44",
		updated: "2017/01/23 04:08",
		surveyURL: "https://www.esurveycreator.com/s/fe09b6c",
		ratingTitle: "Jak bardzo zadanie jest nauczalne",
		statusActive: true,
		autoDeactivate: true,
		autoDeactivateCount: 10,
		multipleResponses: false,
		tasks: [
			{
				name: "1",
				description: "Wyznacz trasę najbliższego odjazdu z własnej pozycji do „Dworzec PKS Wrocław Główny” i podejrzyj na mapie."
			},
			{
				name: "2",
				description: "Pokaż odjazdy z trasy „pl. Strzegomski” do „Poczta Główna” (Wrocław) ustawiając następujące parametry: \na.\tOdjazd, data i godzina: Jutro 19:50\nb.\tPołączenie: wygodne\nc.\tUnikaj przesiadek: tak"
			},
			{
				name: "3",
				description: "Wejdź do „Ostatnio wyszukiwane trasy” i wybierz ostatnio wyszukiwaną trasę.\nNastępnie wybierz Opcje i ustaw parametry:\na.\tPojazdy: Pociąg i Tramwaj\nb.\tPreferowane linie: 2, 10\nc.\tUnikaj linii:1\nd.\tUnikaj autobusów: tak\ne.\tPrzewoźnicy: wszyscy oprócz Bus Marco Polo\nf.\tMinimalny czas na przesiadkę: 5 minut\nNa koniec zamień stację wyjazdu ze stacją docelową i pokaż odjazdy."
			},
			{
				name: "4",
				description: "Sprawdź rozkład jazdy dla tramwajów linii 2, przystanek Tramwajowa w stronę Krzyki. Wybierz rozkład dla „Jutro”. Dodaj rozkład do zapisanych."
			},
			{
				name: "5",
				description: "Sprawdź rozkład autobusów nocnych linii 250 z najbliższego przystanku w kierunku Dworzec Nadodrze. Dodaj go do ulubionych. Następnie odnajdź ten rozkład w zapisanych i usuń go."
			},
			{
				name: "6",
				description: "W ustawieniach zmień miasto na Warszawa, zaznacz Pokazuj mapy od razu."
			}
		]
	}
];

const RESPONSES = [];

export {PROJECTS, RESPONSES}