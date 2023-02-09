import { supabase } from '@/services/supabaseService'
import { ref } from 'vue'

const allSpeakers = ref<any[]>([])

/**
 * Retrieve all speaker info
 */
async function fetchSpeakers() {
  try {
    const { data: speakers, error } = await supabase
      .from('speaker')
      .select('*')
      .order('firstName, lastName')

    if (error) {
      console.log('error', error)
      return
    }

    // handle for when no data is returned
    if (speakers === null) {
        allSpeakers.value = []
      return
    }
    console.log('fetchSpeakers', speakers)
    // store response to ref
    allSpeakers.value = speakers

  } catch (err) {
    console.error('Error retrieving data from db', err)
  }
}

/**
 * Retrieve individual speaker info
 */
async function getSpeaker(id: any) {
  try {
    const { data: speaker, error } = await supabase
      .from('speaker')
      .select('*, session_speaker(session:session_id(*))')
      .eq('id', id)
      .single()

    if (error) {
      console.log('error', error)
      return null
    }

    speaker.sessions = speaker.session_speaker.map((ss:any) => ss.session)
    delete speaker.session_speaker
    console.log('get', speaker)
    return speaker
    
  } catch (err) {
    console.error('Error retrieving data from db', err)
  }
}

export { allSpeakers, fetchSpeakers, getSpeaker }