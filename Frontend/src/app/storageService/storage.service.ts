import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  // set and get Bearer Token

  setBearerToken(data) {
    sessionStorage.setItem('accessToken', JSON.stringify(data));
  }

  getBearerToken() {
    return JSON.parse(sessionStorage.getItem('accessToken'));
  }


  // set and get Active User

  setActiveUser(data) {
    sessionStorage.setItem('active', JSON.stringify(data));
  }

  getActiveUser() {
    return JSON.parse(sessionStorage.getItem('active'));
  }


  // set and get Super User

  setSuperUser(data) {
    sessionStorage.setItem('suser', JSON.stringify(data));
  }

  getSuperUser() {
    return JSON.parse(sessionStorage.getItem('suser'));
  }


  // set and get User ID

  setUserID(data) {
    var decoded: any = jwt_decode(data);
    sessionStorage.setItem("user_id", JSON.stringify(decoded.user_id));
  }

  getUserID() {
    return JSON.parse(sessionStorage.getItem('user_id'));
  }


  // set and get Username

  setUser(data) {
    sessionStorage.setItem('username', JSON.stringify(data));
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('username'));
  }

  // set and get Division

  getDivision() {
    return JSON.parse(sessionStorage.getItem('division'));
  }

  setDivision(data) {
    sessionStorage.setItem('division', JSON.stringify(data));
  }

  // set and get Category
  getCategory() {
    return JSON.parse(sessionStorage.getItem('category'));
  }

  setCategory(data) {
    sessionStorage.setItem('category', JSON.stringify(data));
  }

  // set and get Project manager
  getprojectManager() {
    return JSON.parse(sessionStorage.getItem('pm'));
  }

  setprojectManager(data) {
    sessionStorage.setItem('pm', JSON.stringify(data));
  }

  // set and get Region
  getRegion() {
    return JSON.parse(sessionStorage.getItem('region'));
  }

  setRegion(data) {
    sessionStorage.setItem('region', JSON.stringify(data));
  }

  // set and get Is admin
  getIsAdmin() {
    return JSON.parse(sessionStorage.getItem('Isadmin'));
  }

  setIsAdmin(data) {
    sessionStorage.setItem('Isadmin', JSON.stringify(data));
  }

  // set and get Is Special User

  getIsSpecial() {
    return JSON.parse(sessionStorage.getItem('is_special'));
  }

  setIsSpecial(data) {
    sessionStorage.setItem('is_special', JSON.stringify(data));
  }


}
