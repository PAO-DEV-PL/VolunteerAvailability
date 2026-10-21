const translations = {
            pl: {
                locale: "pl-PL",
                pageTitle: "Formularz wolontariusza",
                firstName: "Imię:",
                lastName: "Nazwisko:",
                experience: "Doświadczenie wolontariackie:",
                noExperience: "Nie mam doświadczenia",
                otherEvents: "Pracowałem przy innych wydarzeniach",
                thisEvent: "Pracowałem już na tym wydarzeniu",
                time: "Godzina:",
                submit: "Wyślij zgłoszenie"
            },
        
            en: {
                locale: "en-GB",
                pageTitle: "Volunteer Form",
                firstName: "First name:",
                lastName: "Last name:",
                experience: "Volunteer experience:",
                noExperience: "No experience",
                otherEvents: "I worked at other events",
                thisEvent: "I have already worked at this event",
                time: "Time:",
                submit: "Submit application"
            }
        };

        function updateLanguage() {
            const language = translations[currentLanguage];

            document.getElementById("pageTitle").textContent = language.pageTitle;
            document.getElementById("firstNameLabel").textContent = language.firstName;
            document.getElementById("lastNameLabel").textContent = language.lastName;
            document.getElementById("experienceLabel").textContent = language.experience;
            document.getElementById("noExperience").textContent = language.noExperience;
            document.getElementById("otherEvents").textContent = language.otherEvents;
            document.getElementById("thisEvent").textContent = language.thisEvent;
            document.getElementById("submitButton").textContent = language.submit;

            renderAvailabilityTable();
        }