import json

def convertir_a_formato_tiempo(milisegundos):
  segundos, milisegundos = divmod(milisegundos, 1000)
  minutos, segundos = divmod(segundos, 60)
  return f"[{minutos:02d}:{segundos:02d}.{milisegundos//10:02d}]" if milisegundos > 0 else f"[{minutos:02d}:{segundos:02d}.00]"

def combinar_milisegundos_y_palabras(archivo_json):
  try:
    with open(archivo_json, 'r', encoding='utf-8') as f:
      datos_json = json.load(f)
      
      if "Lyrics" in datos_json and isinstance(datos_json["Lyrics"], list):
        lyrics = datos_json["Lyrics"]
        
        milisegundos = [int(entry.get("startTimeMs", 0)) for entry in lyrics]
        palabras = [entry.get("words", "").replace("♪", "♫") for entry in lyrics]
        combinado = [f"{convertir_a_formato_tiempo(ms)} {palabra}\n" for ms, palabra in zip(milisegundos, palabras)]
        
        resultado_final = ' '.join(combinado)
        resultado_final = resultado_final.rstrip('\n')
        
        with open('output.json', 'w', encoding='utf-8') as output_file:
          json.dump({"lyrics": resultado_final}, output_file, ensure_ascii=True, indent=4)
        
        print("Archivo 'output.json' creado con éxito.")
        return resultado_final
      else:
        print("Error: La clave 'Lyrics' no es una lista en el archivo JSON.")
        return ""
  except FileNotFoundError:
    print(f"Error: No se pudo encontrar el archivo {archivo_json}")
    return ""

archivo_json = './input.json'
resultado_final = combinar_milisegundos_y_palabras(archivo_json)

print("Done!")
