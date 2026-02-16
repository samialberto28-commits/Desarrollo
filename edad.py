from datetime import date


def calcular_edad(fecha_nacimiento: date, hoy: date | None = None) -> int:
    """Calcula la edad en años cumplidos a partir de una fecha de nacimiento."""
    if hoy is None:
        hoy = date.today()

    edad = hoy.year - fecha_nacimiento.year
    if (hoy.month, hoy.day) < (fecha_nacimiento.month, fecha_nacimiento.day):
        edad -= 1
    return edad


def solicitar_fecha() -> date:
    """Solicita la fecha de nacimiento en formato AAAA-MM-DD."""
    texto = input("Ingresa tu fecha de nacimiento (AAAA-MM-DD): ").strip()
    try:
        anio, mes, dia = map(int, texto.split("-"))
        return date(anio, mes, dia)
    except ValueError as exc:
        raise ValueError("Formato inválido. Usa AAAA-MM-DD.") from exc


def main() -> None:
    try:
        nacimiento = solicitar_fecha()
        edad = calcular_edad(nacimiento)
        print(f"Tu edad es: {edad} años")
    except ValueError as error:
        print(f"Error: {error}")


if __name__ == "__main__":
    main()
