import { supabase } from '@/services/supabaseService'
import { ref } from 'vue'

const allSessions = ref<any[]>([])

function flattenSessionSpeaker(session: any) {
  session.speakers = session.session_speaker.map((ss:any) => ss.speaker)
  delete session.session_speaker
}

/**
 * Retrieve all session info
 */
async function fetchSessions() {
  try {
    const { data: sessions, error } = await supabase
      .from('session')
      .select('*, session_speaker(speaker:speaker_id(*))')
      .order('scheduledAt, title')

    if (error) {
      console.log('error', error)
      return
    }

    // flatten session_speakers relation into an array
    sessions.map(s => {
      flattenSessionSpeaker(s)
    })

    // handle for when no data is returned
    if (sessions === null) {
      allSessions.value = []
      return
    }
    console.log('fetchSessions', sessions)
    // store response to ref
    allSessions.value = sessions

  } catch (err) {
    console.error('Error retrieving data from db', err)
  }
}

/**
 * Retrieve individual session info
 */
async function getSession(id: any) {
  try {
    const { data: session, error } = await supabase
      .from('session')
      .select('*, session_speaker(speaker:speaker_id(*))')
      .eq('id', id)
      .single()

    if (error) {
      console.log('error', error)
      return null
    }

    // flatten session_speakers
    flattenSessionSpeaker(session)
    console.log('getSession', session)
    return session
    
  } catch (err) {
    console.error('Error retrieving data from db', err)
  }
}

export { allSessions, fetchSessions, getSession }