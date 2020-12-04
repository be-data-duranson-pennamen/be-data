<template>
  <section v-if="loaded" class="main-content">
    <div class="form">
      <h1>Création de vol</h1>

      <div v-if="departureAirport && departureAirport.name" class="item">
        <strong>Départ</strong>
        <div class="dropdown">
          <button class="dropbtn">{{ departureAirport.name }}</button>
          <div class="dropdown-content">
            <a v-for="airport in airports" :key="airport.id">
              <a @click="departureAirport = airport">{{ airport.name }}</a>
            </a>
          </div>
        </div>
        <input type="date" :min="minimumDate" v-model="departureDate.day" />
        <input type="time" v-model="departureDate.time" />
      </div>
      <div v-if="arrivalAirport && arrivalAirport.name" class="item">
        <strong>Arrivée</strong>
        <div class="dropdown">
          <button class="dropbtn">{{ arrivalAirport.name }}</button>
          <div class="dropdown-content">
            <a v-for="airport in airports" :key="airport.id">
              <a @click="arrivalAirport = airport">{{ airport.name }}</a>
            </a>
          </div>
        </div>
        <input type="date" v-model="arrivalDate.day" disabled />
        <input type="time" v-model="arrivalDate.time" disabled />
      </div>
      <div v-if="planes" class="item">
        <strong>Avion</strong>
        <div class="dropdown">
          <button class="dropbtn">
            {{
              chosenPlane
                ? "N°" + chosenPlane.id + " - " + chosenPlane.type
                : "Parcourir..."
            }}
          </button>
          <div class="dropdown-content">
            <a v-for="plane in planes" :key="plane.id">
              <a @click="chosenPlane = plane"
                >N°{{ plane.id }} - {{ plane.type }} - {{ plane.capacity }}</a
              >
            </a>
          </div>
        </div>
      </div>
      <div v-if="pilotsShown" class="item">
        <strong>Pilotes</strong>
        <div class="dropdown">
          <button class="dropbtn">
            {{
              pilot1
                ? pilot1.firstName + " " + pilot1.lastName
                : "Pilote n°1..."
            }}
          </button>
          <div class="dropdown-content">
            <a v-for="pilot in pilotsShown" :key="pilot.secuNum">
              <a @click="pilot1 = pilot">{{
                pilot.firstName + " " + pilot.lastName
              }}</a>
            </a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">
            {{
              pilot2
                ? pilot2.firstName + " " + pilot2.lastName
                : "Pilote n°2..."
            }}
          </button>
          <div class="dropdown-content">
            <a v-for="pilot in pilotsShown" :key="pilot.secuNum">
              <a @click="pilot2 = pilot">{{
                pilot.firstName + " " + pilot.lastName
              }}</a>
            </a>
          </div>
        </div>
      </div>
      <div v-if="stewartsShown" class="item">
        <strong>Stewarts</strong>
        <div class="dropdown">
          <button class="dropbtn">
            {{
              stewart1
                ? stewart1.firstName + " " + stewart1.lastName
                : "Stewart n°1..."
            }}
          </button>
          <div class="dropdown-content">
            <a v-for="stewart in stewartsShown" :key="stewart.secuNum">
              <a @click="stewart1 = stewart">{{
                stewart.firstName + " " + stewart.lastName
              }}</a>
            </a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">
            {{
              stewart2
                ? stewart2.firstName + " " + stewart2.lastName
                : "Stewart n°2..."
            }}
          </button>
          <div class="dropdown-content">
            <a v-for="stewart in stewartsShown" :key="stewart.secuNum">
              <a @click="stewart2 = stewart">{{
                stewart.firstName + " " + stewart.lastName
              }}</a>
            </a>
          </div>
        </div>
      </div>
      <div class="item">
        <strong>Prix du billet</strong>
        <input
          type="number"
          min="0"
          v-model="price"
          placeholder="Prix en centimes"
        />
      </div>
      <div class="item">
        <strong>Fréquence</strong>
        <div class="dropdown">
          <button class="dropbtn">
            {{ frequency }}
          </button>
          <div class="dropdown-content">
            <a v-for="choice in frequencyChoice" :key="choice.id">
              <a @click="frequency = choice">{{ choice }}</a>
            </a>
          </div>
        </div>
      </div>
      <button class="design-button green-button" @click="validate">
        Valider
      </button>
      <button class="design-button blue-button" @click="$router.push('/admin')">
        Retour
      </button>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      airports: undefined,
      planes: undefined,
      departureAirport: undefined,
      arrivalAirport: undefined,
      departureDate: { day: undefined, time: undefined },
      arrivalDate: { day: undefined, time: undefined },
      chosenPlane: undefined,
      employees: undefined,
      pilots: undefined,
      stewarts: undefined,
      pilotsShown: undefined,
      stewartsShown: undefined,
      pilot1: undefined,
      pilot2: undefined,
      stewart1: undefined,
      stewart2: undefined,
      price: undefined,
      frequencyChoice: ["Vol unique", "Quotidien", "Hebdomadaire"],
      frequency: "Vol unique",
      loaded: false,
    };
  },

  async mounted() {
    const airportsOutput = await axios.get(
      `${process.env.VUE_APP_API_URL}/flight/airports`
    );
    const planesOutput = await axios.get(
      `${process.env.VUE_APP_API_URL}/plane`
    );
    const employeesOutput = await axios.get(
      `${process.env.VUE_APP_API_URL}/employee`
    );

    this.airports = airportsOutput.data;
    this.departureAirport = this.airports[0];
    this.arrivalAirport = this.airports[0];
    this.planes = planesOutput.data;
    this.employees = employeesOutput.data;
    this.pilots = this.employees.filter((employee) => employee.job == "pilot");
    this.stewarts = this.employees.filter(
      (employee) => employee.job == "stewart"
    );
    this.pilotsShown = { ...this.pilots };
    this.stewartsShown = { ...this.stewarts };
    this.loaded = true;
  },
  methods: {
    filterEmployee() {
      if (this.pilot1 || this.pilot2) {
        this.pilotsShown = this.pilots.filter(
          (pilot) =>
            (!this.pilot1 ||
              (this.pilot1 && pilot.secuNum != this.pilot1.secuNum)) &&
            (!this.pilot2 ||
              (this.pilot2 && pilot.secuNum != this.pilot2.secuNum))
        );
      }
      if (this.stewart1 || this.stewart2) {
        this.stewartsShown = this.stewarts.filter(
          (stewart) =>
            (!this.stewart1 ||
              (this.stewart1 && stewart.secuNum != this.stewart1.secuNum)) &&
            (!this.stewart2 ||
              (this.stewart2 && stewart.secuNum != this.stewart2.secuNum))
        );
      }
    },
    calculArrivalDate() {
      if (
        this.departureAirport &&
        this.arrivalAirport &&
        this.departureAirport != this.arrivalAirport &&
        this.departureDate.day &&
        this.departureDate.time
      ) {
        const delay = this.airports
          .find((airport) => airport.name == this.departureAirport.name)
          .travel.find(
            (travelChosen) => travelChosen.to == this.arrivalAirport.name
          ).time;
        const arrivalTimestamp = new Date(
          new Date(
            String(this.departureDate.day) +
              " " +
              String(this.departureDate.time)
          ).getTime() +
            60000 * delay
        );
        const arrivalDay = `${arrivalTimestamp.getFullYear()}-${this.round(
          arrivalTimestamp.getMonth() + 1
        )}-${this.round(arrivalTimestamp.getDate())}`;
        const arrivalTime = `${this.round(
          arrivalTimestamp.getHours()
        )}:${this.round(arrivalTimestamp.getMinutes())}`;

        this.arrivalDate = {
          day: arrivalDay,
          time: arrivalTime,
        };
      } else {
        this.arrivalDate = { day: undefined, time: undefined };
      }
    },
    round(number) {
      if (Number(number) < 10) return `0${number}`;
      else return number;
    },
    async validate() {
      let errorMessage = "";
      if (!this.arrivalDate.day)
        errorMessage =
          errorMessage +
          "\n - La date d'arrivée (calculée avec l'heure de départ et les noms des aéroports)";
      if (!this.chosenPlane)
        errorMessage = errorMessage + "\n - L'avion choisi";
      if (!this.pilot1) errorMessage = errorMessage + "\n - Le premier pilote";
      if (!this.pilot2) errorMessage = errorMessage + "\n - Le deuxième pilote";
      if (!this.stewart1)
        errorMessage = errorMessage + "\n - Le premier stewart";
      if (!this.stewart2)
        errorMessage = errorMessage + "\n - Le deuxième stewart";
      if (!this.price) errorMessage = errorMessage + "\n - Le prix du billet";

      if (errorMessage != "") {
        errorMessage = "Il manque les informations suivantes :" + errorMessage;
        alert(errorMessage);
      } else {
        if (this.frequency == "Vol unique") {
          await axios.post(`${process.env.VUE_APP_API_URL}/flight/create`, {
            departureAirport: this.departureAirport.name,
            arrivalAirport: this.arrivalAirport.name,
            departureDate: new Date(
              this.departureDate.day + " " + this.departureDate.time
            ),
            arrivalDate: new Date(
              this.arrivalDate.day + " " + this.arrivalDate.time
            ),
            planeId: this.chosenPlane.id,
            pilot1: this.pilot1.secuNum,
            pilot2: this.pilot2.secuNum,
            stewart1: this.stewart1.secuNum,
            stewart2: this.stewart2.secuNum,
            price: Number(this.price),
            emptyPlaces: this.chosenPlane.capacity,
          });
        } else {
          let travel = {
            departureAirport: this.departureAirport.name,
            arrivalAirport: this.arrivalAirport.name,
            departureDate: new Date(
              this.departureDate.day + " " + this.departureDate.time
            ),
            arrivalDate: new Date(
              this.arrivalDate.day + " " + this.arrivalDate.time
            ),
            planeId: this.chosenPlane.id,
            pilot1: this.pilot1.secuNum,
            pilot2: this.pilot2.secuNum,
            stewart1: this.stewart1.secuNum,
            stewart2: this.stewart2.secuNum,
            price: Number(this.price),
            emptyPlaces: this.chosenPlane.capacity,
          };
          let flightList = [];
          const frequencyDelay =
            this.frequency == "Quotidien"
              ? 24 * 3600 * 1000
              : 24 * 3600 * 1000 * 7;
          const number = this.frequency == "Quotidien" ? 28 : 4;
          for (let i = 0; i < number; i++) {
            const travelCopy = { ...travel };
            travelCopy.departureDate = new Date(
              travel.departureDate.getTime() + frequencyDelay * i
            );
            travelCopy.arrivalDate = new Date(
              travel.arrivalDate.getTime() + frequencyDelay * i
            );
            flightList.push(travelCopy);
          }
          await axios.post(`${process.env.VUE_APP_API_URL}/flight/createMany`, {
            flightList,
          });
        }
        alert("Vol(s) créé(s) avec succès !");
        this.departureDate = { day: undefined, time: undefined };
        this.arrivalDate = { day: undefined, time: undefined };
        this.chosenPlane = undefined;
        this.pilot1 = undefined;
        this.pilot2 = undefined;
        this.stewart1 = undefined;
        this.stewart2 = undefined;
        this.price = undefined;
        this.frequency = "Vol unique";
      }
    },
  },
  watch: {
    departureAirport: {
      handler: "calculArrivalDate",
      deep: true,
    },
    arrivalAirport: {
      handler: "calculArrivalDate",
      deep: true,
    },
    departureDate: {
      handler: "calculArrivalDate",
      deep: true,
    },
    pilot1: {
      handler: "filterEmployee",
      deep: true,
    },
    pilot2: {
      handler: "filterEmployee",
      deep: true,
    },
    stewart1: {
      handler: "filterEmployee",
      deep: true,
    },
    stewart2: {
      handler: "filterEmployee",
      deep: true,
    },
  },
  computed: {
    minimumDate() {
      const current_date = new Date(Date.now());
      return `${current_date.getFullYear()}-${
        current_date.getMonth() + 1
      }-${current_date.getDate()}`;
    },
  },
  // Mettre un point d'honneur sur l'incomptabilité entre les planning d'avion et du personnel, mettre l'heure arrivée automatiquement lorsque les aéroports et l'heure de départ est choisi
};
</script>