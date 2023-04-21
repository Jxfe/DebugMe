import React, { useState } from "react"; // Needed for AWS since it's using node 16
import './style.css';
import Button from '../../Components/Button';

import Main from '../Main/Main';

function Calendar() {
  return (

    <div class="calendar-container">
      
      
        <div class="calendar">
          <div class="month"> 
            <h2>April 2023</h2> 
          </div> 

          <ul class="weekdays">
            <li>Mo</li>
            <li>Tu</li>
            <li>We</li>
            <li>Th</li>
            <li>Fr</li>
            <li>Sa</li>
            <li>Su</li>
          </ul> 

          <ul class="days"> 
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>20</li>
            <li>21</li>
            <li>22</li>
            <li>23</li>
            <li>24</li>
            <li>25</li>
            <li>26</li>
            <li>27</li>
            <li>28</li>
            <li>29</li>
            <li>30</li>
          </ul> 
        </div>
        
        <div class="filter-container">
          <div class="calendar-filters">
            
            <Button className='filter-button' content='Type' />
            <Button className='filter-button' onClickEvent={ ()=>useState("premiumguides") } content='Distance' />
      
          </div>
            
          <div class="event-buttons">
            <button class="event-button">
              <div class="event-date">May 10</div>
              <div class="event-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </button>
            <button class="event-button">
              <div class="event-date">May 15</div>
              <div class="event-description">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </button>
            <button class="event-button">
              <div class="event-date">May 20</div>
              <div class="event-description">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            </button>
          </div>  
        </div>
        
    </div>

);
}

export default Calendar;
