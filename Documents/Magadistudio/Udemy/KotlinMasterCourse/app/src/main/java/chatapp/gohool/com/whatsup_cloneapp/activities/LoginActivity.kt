package chatapp.gohool.com.whatsup_cloneapp.activities

import android.app.ProgressDialog
import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.widget.Toast
import chatapp.gohool.com.whatsup_cloneapp.R
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import kotlinx.android.synthetic.main.activity_login.*

class LoginActivity : AppCompatActivity() {
    var  mAuth: FirebaseAuth? = null
    var mProgressDialog: ProgressDialog? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        mAuth = FirebaseAuth.getInstance()

        mProgressDialog = ProgressDialog(this)






        login_LoginButton.setOnClickListener {


            var email = loginEmailEt.text.toString()
            var password = loginEmailEt.text.toString()

//            mAuth!!.createUserWithEmailAndPassword(email, password)
//                    .addOnCompleteListener({
//                        task: Task<AuthResult> ->
//                          if (task.isSuccessful) {
//                              Toast.makeText(this, "Created", Toast.LENGTH_LONG)
//                                      .show()
//                          }else{
//                               Toast.makeText(this, "Not created", Toast.LENGTH_LONG)
//                                       .show()
//                          }
//                    })


            if (!TextUtils.isEmpty(email) && !TextUtils.isEmpty(password)) {

                mProgressDialog!!.setTitle("Login...")
                mProgressDialog!!.setMessage("Loging in...")
                mProgressDialog!!.show()

                mAuth!!.signInWithEmailAndPassword(email, password)
                        .addOnCompleteListener({
                            task: Task<AuthResult> ->

                            if (task.isSuccessful) {

                                mProgressDialog!!.hide()
                                //go to dashboard
                                startActivity(Intent(this, DashboardActivity::class.java))
                                finish()

                            }else{
                                mProgressDialog!!.hide()
                                Toast.makeText(this, task.exception.toString(),
                                        Toast.LENGTH_LONG).show()
                                Log.d("Error", "Auth Error:" + task.exception.toString())

                            }

                        })
            }
        }






    }
}
