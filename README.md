# Smart Streetlight System (CPC357 Project, Academic Session 2025/2026)

Group Members:
# Nur Aina Sofeya Binti Mohamed Yusof 
# Nurul Afiqah Binti Azhar 

An IoT-based intelligent street lighting system designed to optimize energy consumption while ensuring safety. The system adjusts LED brightness based on time, weather conditions (cloudy/rainy), and real-time motion detection for both pedestrians and vehicles.

## System Features

* **Multi-Level Brightness:**
* **Off:** Daytime (Clear weather).
* **Low (20%):** Night standby or Cloudy daytime.
* **Medium (60%):** Pedestrian detected via PIR sensor.
* **High (100%):** Vehicle detected via IR Break Beam sensor.


* **Weather Intelligence:** Automatically activates during the day if the VEML7700 detects low light (Lux) and the BME280 detects high humidity (cloudy/rainy conditions).
* **Smooth Fading:** Implements a soft-start/soft-stop PWM transition to prevent distracting light flickering.
* **IoT Connectivity:** Streams real-time environmental data (Temp, Humidity, Lux) and system status to an MQTT broker.
* **Noise Filtering:** Includes software debouncing to prevent false motion triggers caused by WiFi interference.

## Sustainability & SDG Alignment
This project directly supports Sustainable Development Goal (SDG) 11: Sustainable Cities and Communities.

* Energy Efficiency (Target 11.6): By utilizing adaptive dimming (adjusting brightness based on ambient light and motion), the system reduces unnecessary electricity usage, achieving potential energy savings of    up to 60%. This directly minimizes the environmental impact and greenhouse gas emissions of urban infrastructure.

* Public Safety (Target 11.7): Integration of PIR and IR sensors ensures that illumination increases automatically for pedestrians and vehicles, promoting safe and inclusive public spaces even during adverse       weather.

* Intelligent Infrastructure: The system demonstrates a scalable, data-driven approach, allowing city planners to leverage IoT for real-time monitoring and efficient resource utilization.

## Hardware Requirements

* **Microcontroller:** Maker Feather AIoT S3 ESP32
* **Sensors:**
* **BME280:** Temperature & Humidity
* **VEML7700:** Ambient Light (Lux)
* **PIR Sensor:** Human motion detection
* **IR Break Beam:** Vehicle detection


* **Output:** High-power LED (connected via PWM)

## 📌 Pin Mapping

| Component | ESP32 Pin |
| --- | --- |
| SDA (I2C) | Pin SDA |
| SCL (I2C) | Pin SCL |
| PIR Sensor | GPIO 4 |
| IR Break Beam | Pin A5 |
| LED Output | Pin A2 |

## Server Infrastructure
Platform: Google Cloud Platform (GCP)

Service: Compute Engine (VM Instance)

Instance Type: e2-micro

Broker: Mosquitto MQTT Broker (running on Port 1883)

## Cloud Architecture & Server Infrastructure
The system utilizes Google Cloud Platform (GCP) for robust data ingestion and storage:

Edge Broker: Mosquitto MQTT Broker running on a GCP Compute Engine (e2-micro).

Ingestion Bridge: A data bridge routes MQTT messages into GCP Pub/Sub.

Data Pipeline: Google Cloud Dataflow consumes the Pub/Sub stream, performing real-time transformation and deduplication.

Database: Cloud Firestore (NoSQL) stores the processed telemetry data, allowing for easy integration with web or mobile dashboards.


## Setup Instructions

1. **Library Requirements:** Install the following in your Arduino IDE:
* `Adafruit_BME280`
* `Adafruit_VEML7700`
* `PubSubClient`
* `ArduinoJson`


2. **WiFi/MQTT Configuration:** Update the following variables in the `.ino` file:
```cpp
const char* WIFI_SSID = "your_ssid";
const char* WIFI_PASSWORD = "your_password";
const char* MQTT_SERVER = "your_mqtt_broker_ip";

```


3. **Deployment:** Upload the code to your ESP32. Ensure the sensors are powered via the ** 3V3 (3V) and USB (5V for IR break beam sensors)** pin for stability, especially the IR Break Beam.

4. **  ** Install the following in your Arduino IDE:

## MQTT Data Format

The system publishes a JSON payload to the `street-light-project` topic:

```json
{
  "temp": 29.5,
  "hum": 57.7,
  "lux": 150.0,
  "brightness": 255,
  "pedestrian": true,
  "vehicle": false,
  "isNight": true,
  "isCloudy": false
}



