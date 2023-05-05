import React, { useState } from "react"; // Needed for AWS since it's using node 16
import "./style.css";
import Button from "../../Components/Button";

import { Link } from "react-router-dom";

function Calendar() {
  const [state, setState] = useState(0);

  function goToNState(n) {
    setState(n);
  }

  function goToBase() {
    setState(1);
  }

  function goToDistanceFilter() {
    setState(2);
  }

  function goToFiltedValues() {
    setState(3);
  }

  function goToAttendence() {
    setState(5);
  }
  function goToConfirm() {
    setState(6);
  }

  var state_1 = (
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
          <Button className="filter-button" content="Type" />
          <Button
            className="filter-button"
            onClickEvent={goToDistanceFilter}
            content="Distance"
          />
        </div>

        <div class="event-buttons">
          <Link to="/myevents">
            <Button className="btn" content="My Events" />
          </Link>
          <button class="event-button" onClick={() => goToNState(4)}>
            <div class="event-date">May 10</div>
            <div class="event-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </button>
          <button class="event-button">
            <div class="event-date">May 15</div>
            <div class="event-description">
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </button>
          <button class="event-button">
            <div class="event-date">May 20</div>
            <div class="event-description">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  var state_2 = (
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
          <Button className="filter-button" content="Type" />
          <Button
            className="filter-button"
            onClickEvent={goToDistanceFilter}
            content="Distance"
          />
        </div>

        <div class="event-buttons">
          <Button
            className="filter-button"
            onClickEvent={goToFiltedValues}
            content="1 Mile"
          />
          <Button
            className="filter-button"
            onClickEvent={goToFiltedValues}
            content="5 Miles"
          />
          <Button
            className="filter-button"
            onClickEvent={goToFiltedValues}
            content="10 Miles"
          />
          <Button
            className="filter-button"
            onClickEvent={goToBase}
            content="25 Miles"
          />
        </div>
      </div>
    </div>
  );

  var state_3 = (
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
          <Button className="filter-button" content="Type" />
          <Button
            className="filter-button"
            onClickEvent={goToDistanceFilter}
            content="Distance"
          />
        </div>

        <div class="event-buttons">
          <button class="event-button" onClick={() => goToNState(4)}>
            <div class="event-date">May 10</div>
            <div class="event-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </button>
        </div>
      </div>
    </div>
  );
  var state_4 = (
    <div>
      <div class="calendar-container">
        <div class="calendar">
          <div class="month">
            <h2>May 10</h2>
          </div>

          <ul>
            <li>From Tom</li>
          </ul>

          <ul class="days">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </ul>
        </div>

        <div class="filter-container">
          <img
            src="https://media.istockphoto.com/id/1181250359/photo/business-people.jpg?s=1024x1024&w=is&k=20&c=YNRK_RMfy98iOmkkJwzcDJg2uoZqmymNyXbyvKo7qIU="
            alt="alternatetext"
            width="256"
            height="256"
          />
        </div>
      </div>
      <div class="calendar-container">
        <Button
          className="filter-button"
          onClickEvent={goToBase}
          content="Save"
        />
        <Button
          className="filter-button"
          onClickEvent={goToAttendence}
          content="Attend"
        />
      </div>
    </div>
  );

  var state_5 = (
    <div>
      <div class="calendar-container">
        <div class="calendar">
          <div class="month">
            <h2>Thank you for Attending!</h2>
          </div>

          <ul class="days">
            <p>How many people will attend?</p>
            <input type="text" id="fname" name="fname" />
          </ul>
        </div>
      </div>
      <div class="calendar-container">
        <Button
          className="filter-button"
          onClickEvent={goToConfirm}
          content="Submit"
        />
      </div>
    </div>
  );

  var state_6 = (
    <div>
      <div class="calendar-container">
        <div class="calendar">
          <div class="month">
            <h2>Attendance Confirmed</h2>
          </div>
        </div>
      </div>
      <div class="calendar-container">
        <Button
          className="filter-button"
          onClickEvent={goToBase}
          content="EventChat"
        />
      </div>
    </div>
  );

  switch (state) {
    case 1:
      return state_1;
    case 2:
      return state_2;
    case 3:
      return state_3;
    case 4:
      return state_4;
    case 5:
      return state_5;
    case 6:
      return state_6;
    default:
      return state_1;
  }
}

export default Calendar;
