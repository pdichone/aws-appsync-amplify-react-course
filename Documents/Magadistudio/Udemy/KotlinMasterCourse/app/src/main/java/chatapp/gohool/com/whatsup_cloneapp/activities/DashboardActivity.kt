package chatapp.gohool.com.whatsup_cloneapp.activities

import android.content.Intent
import android.graphics.Color
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.design.widget.TabLayout
import android.support.v4.view.ViewPager
import android.view.Menu
import android.view.MenuItem
import chatapp.gohool.com.whatsup_cloneapp.R
import chatapp.gohool.com.whatsup_cloneapp.adapters.SectionsPagerAdapter
import com.google.firebase.auth.FirebaseAuth
import kotlinx.android.synthetic.main.activity_dashboard.*

class DashboardActivity : AppCompatActivity() {
    var sectionAdapter: SectionsPagerAdapter? = null



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        supportActionBar!!.title = "Dashboard"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)


        //setup TAbs
        sectionAdapter = SectionsPagerAdapter(supportFragmentManager)

        dash_ViewPagerId.adapter = sectionAdapter
        main_tabs.setupWithViewPager(dash_ViewPagerId)
        main_tabs.setTabTextColors(Color.WHITE, Color.GREEN)




    }


    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
         super.onCreateOptionsMenu(menu)

        menuInflater.inflate(R.menu.main_menu,menu)


        return true
    }

    override fun onOptionsItemSelected(item: MenuItem?): Boolean {
         super.onOptionsItemSelected(item)
        if (item != null) {
            if (item.itemId == R.id.menu_logout) {
                FirebaseAuth.getInstance().signOut()
                startActivity(Intent(this, MainActivity::class.java))
                finish()
            }

            if (item.itemId == R.id.actSettings) {
                startActivity(Intent(this, AccountSettings::class.java))
            }

            if (item.itemId == R.id.actAllUsers) {
                //show all users
            }

        }


        return true
    }
}
