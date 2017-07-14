package chatapp.gohool.com.whatsup_cloneapp.activities

import android.app.ProgressDialog
import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.widget.ProgressBar
import android.widget.Toast
import chatapp.gohool.com.whatsup_cloneapp.R
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import kotlinx.android.synthetic.main.activity_create_account.*

class CreateAccountActivity : AppCompatActivity() {
    var mAuth: FirebaseAuth? = null
    var mProgress: ProgressDialog? = null
    var mDatabase: DatabaseReference? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_account)



        mProgress = ProgressDialog(this)

        supportActionBar!!.setTitle("Create Account")
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        mAuth = FirebaseAuth.getInstance()


        createAccountID.setOnClickListener {
            var email = account_EmailId.text.toString()
            var password = account_PasswordId.text.toString()
            var displayName = account_displayNameId.text.toString()

            if (!TextUtils.isEmpty(email) || !TextUtils.isEmpty(password) ||
                    !TextUtils.isEmpty(displayName)) {
                mProgress?.setTitle("Account")
                mProgress?.setMessage("Please wait while you account is created!")


                mAuth!!.createUserWithEmailAndPassword(email, password)
                        .addOnCompleteListener {
                            task: Task<AuthResult> ->

                            if (task.isSuccessful) {

                                //Get users ID
                                var currentUser = mAuth!!.currentUser!!
                                var userId = currentUser.uid

                                //Set database Reference
                                mDatabase = FirebaseDatabase.getInstance().reference
                                        .child("Users").child(userId)

                                //create hashmap to construct our user object
                                var userObject = HashMap<String, String>()
                                userObject.put("display_name", displayName )
                                userObject.put("user_status","Hey this chat app is great!")
                                userObject.put("image", "default")
                                userObject.put("thumb_image", "default")

                                mDatabase?.setValue(userObject)!!.addOnCompleteListener {
                                    task: Task<Void> ->
                                      if (task.isSuccessful) {
                                          mProgress?.dismiss()
                                          //go to dashboard
                                          startActivity(Intent(this, DashboardActivity::class.java))
                                          finish()

                                      }else {
                                          mProgress?.dismiss()

                                      }
                                }



                            }else{
                                mProgress?.dismiss()
                                Toast.makeText(this, task.exception.toString(),
                                        Toast.LENGTH_LONG).show()
                                Log.d("Error", "Auth Error:" + task.exception.toString())

                            }

                        }

            }


        }



    }
}
