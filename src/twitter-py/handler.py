import json
import tweepy
import os
import requests


class DownloadError(Exception):
    pass

consumer_key = os.environ.get('CONSUMER_KEY')
consumer_secret = os.environ.get('CONSUMER_SECRET')
access_token = os.environ.get('ACCESS_TOKEN')
access_token_secret = os.environ.get('ACCESS_TOKEN_SECRET')

def download_file(url, filename):
    """
    Download a file from the given URL and save it with the specified filename.
    
    Args:
        url (str): The URL of the file to download.
        filename (str): The name of the file to save the downloaded content to.
    """
    try:
        # Send a GET request to the URL
        response = requests.get(url, stream=True)
        
        # Raise an exception if the response status code is not 200 (OK)
        response.raise_for_status()
        
        # Open a file in binary write mode
        with open(filename, 'wb') as file:
            # Iterate over the response content in chunks
            for chunk in response.iter_content(chunk_size=8192):
                # Write the chunk to the file
                file.write(chunk)
        
        print(f"File '{filename}' downloaded successfully.")
    except requests.exceptions.RequestException as e:
        print(f"Error occurred while downloading the file: {e}")
        raise DownloadError(f"Error downloading file from {url}: {e}")

def get_twitter_conn_v1(consumer_key, consumer_secret, access_token, access_token_secret) -> tweepy.API:
    """Get twitter conn 1.1"""

    auth = tweepy.OAuth1UserHandler(
      consumer_key, consumer_secret
  )
    auth.set_access_token(
        access_token,
        access_token_secret,
    )
    return tweepy.API(auth)

def get_twitter_conn_v2(consumer_key, consumer_secret, access_token, access_token_secret) -> tweepy.Client:
    """Get twitter conn 2.0"""

    client = tweepy.Client(
        consumer_key=consumer_key,
        consumer_secret=consumer_secret,
        access_token=access_token,
        access_token_secret=access_token_secret,
    )

    return client

def tweet(event, context):
    # Parse the JSON body of the request
    request_body = json.loads(event['body'])

    # Extract the video_url from the request body
    text = request_body.get('text', '')
    video_url = request_body.get('video_url', '')
    try:

        client_v1 = get_twitter_conn_v1(consumer_key, consumer_secret, access_token, access_token_secret)
        client_v2 = get_twitter_conn_v2(consumer_key, consumer_secret, access_token, access_token_secret)

        local_filename = "/tmp/downloaded_file.mp4"
        download_file(video_url, local_filename)

        media = client_v1.media_upload(filename=local_filename)

        media_id = media.media_id

        client_v2.create_tweet(text=text, media_ids=[media_id])

        body = {
            "message": "Tweeted successfully",
        }

        response = {
            "statusCode": 200,
            "body": json.dumps(body)
        }

    except DownloadError as download_error:
        response = {
            "statusCode": 500,
            "body": json.dumps({"error": str(download_error)})
        }
    except Exception as e:
        response = {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

    finally:
        return response