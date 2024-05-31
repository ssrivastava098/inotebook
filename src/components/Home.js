import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>Enter your Notes</h1>
      <div className="container my-3">
        <form>
          <div className="row mb-3">
            <label for="inputEmail3" className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputEmail3" />
            </div>
          </div>
          <div className="row mb-3">
            <label for="inputPassword3" className="col-sm-2 col-form-label" >Description</label>
            <div className="col-sm-10">
              <textarea class="form-control" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
            </div>
          </div>


          <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-2 pt-0">Tags</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" />
                <label className="form-check-label" for="gridRadios1">
                  Personal
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                <label className="form-check-label" for="gridRadios2">
                  Education
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" />
                <label className="form-check-label" for="gridRadios3">
                  Expenses
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="option4" />
                <label className="form-check-label" for="gridRadios4">
                  Others
                </label>
              </div>
            </div>
          </fieldset>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      <h1>Your Notes</h1>
    </div>
  )
}

export default Home