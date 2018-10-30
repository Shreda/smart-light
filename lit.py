#!/usr/bin/env python3

import time
from neopixel import *
import argparse
import requests
import json
import datetime

# LED strip configuration:
LED_COUNT      = 3      # Number of LED pixels.
LED_PIN        = 18      # GPIO pin connected to the pixels (18 uses PWM!).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

API_URL = "http://172.20.10.122:4000/"

LIGHT_ID       = "cjnu4hp0u00190a68ieele3zn"

LIGHT_QUERY = """
  query light($id: ID!){
    light(id:$id){
      color
    }
  }
"""

def query_api(query='', variables={}, url='', headers={}):
    """
    Make query response
    """
    request = requests.post(url, json={'query': query, 'variables': variables}, headers=headers) # Sends a post request to the API with the necessary parameters.
    if request.status_code == 200: # If the request is returned successfully
        return request.json() # Return the reqest in JSON.
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query)) # Inform the console why the request was not returned successfully.


# Define functions which animate LEDs in various ways.
def colorWipe(strip, color, wait_ms=50):
  """Wipe color across display a pixel at a time."""
  for i in range(strip.numPixels()):
    strip.setPixelColor(i, color)
    strip.show()
    time.sleep(wait_ms/1000.0)

def turnRed(strip):
  strip.setPixelColor(1, 0xFF0000)
  strip.show()

# Main program logic follows:
if __name__ == '__main__':
  # Process arguments
  parser = argparse.ArgumentParser()
  parser.add_argument('-c', '--clear', action='store_true', help='clear the display on exit')
  args = parser.parse_args()

  # Create NeoPixel object with appropriate configuration.
  strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
  # Intialize the library (must be called once before other functions).
  strip.begin()

  print ('Press Ctrl-C to quit.')
  if not args.clear:
    print('Use "-c" argument to clear LEDs on exit')

  try:
    while True:
      turnRed(strip)
      print(data)
      data = query_api(query=LIGHT_QUERY, variables={'id': LIGHT_ID}, url=API_URL)
      color = data['data']['light']['color']
      hex_color = int(color, 16)
      print(hex(hex_color)
      time.sleep(5)

  except KeyboardInterrupt:
    if args.clear:
        colorWipe(strip, Color(0,0,0), 10)