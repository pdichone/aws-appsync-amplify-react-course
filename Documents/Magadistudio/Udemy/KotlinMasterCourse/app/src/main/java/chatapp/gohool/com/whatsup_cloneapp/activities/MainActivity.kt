package chatapp.gohool.com.whatsup_cloneapp.activities

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import chatapp.gohool.com.whatsup_cloneapp.R
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    var mAuth: FirebaseAuth? = null
    var user: FirebaseUser? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //Initialize our Firebase Auth
        mAuth = FirebaseAuth.getInstance()

        loginMainButton.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))

        }

        needAccountBtn.setOnClickListener {
            startActivity(Intent(this, CreateAccountActivity::class.java))
        }
    }

    override fun onStart() {
        super.onStart()

//        //Check if user is already signed in...
         user = mAuth!!.currentUser!!

        if(user == null) {
            //User is  signed in, so we take them to Dashboard so they can see activities, chats.., requests etc.
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }else {
            startActivity(Intent(this, DashboardActivity::class.java)) //stay on this activity
            finish()
        }


    }
}
