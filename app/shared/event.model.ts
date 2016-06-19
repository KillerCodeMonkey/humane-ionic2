export interface Event {
  id: number,
  name: string,
  date: string,
  lat: number,
  lng: number,
  description?: string,
  tags?: string
}