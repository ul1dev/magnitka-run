export function toUtcPlusHours(d: Date, hours: number): string {
    // d — локальное время пользователя как Date (уже конкретный момент)
    // сдвигаем момент на +hours и сериализуем в UTC (ISO с Z)
    return new Date(d.getTime() + hours * 3600_000).toISOString();
}
