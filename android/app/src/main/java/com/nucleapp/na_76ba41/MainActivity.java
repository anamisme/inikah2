package com.nucleapp.na_76ba41;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Message;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebView.WebViewTransport;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private static final String APP_URL = "https://inikahkarangdadap.my.id/?app=1";
    private static final String APP_HOST = "inikahkarangdadap.my.id";

    private boolean openExternal(Uri uri) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
        } catch (Exception e) {
        }
        return true;
    }

    private boolean isPdf(Uri uri) {
        if (uri == null) return false;
        String u = uri.toString().toLowerCase();
        return u.contains(".pdf") || u.contains(".png") || u.contains(".jpg") || u.contains(".jpeg");
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.myWebView);

        WebSettings ws = webView.getSettings();
        ws.setJavaScriptEnabled(true);
        ws.setDomStorageEnabled(true);
        ws.setDatabaseEnabled(true);
        ws.setCacheMode(WebSettings.LOAD_DEFAULT);
        ws.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        ws.setSupportMultipleWindows(true);
        ws.setJavaScriptCanOpenWindowsAutomatically(true);
        ws.setAllowFileAccess(true);
        ws.setLoadWithOverviewMode(true);
        ws.setUseWideViewPort(true);
        ws.setMediaPlaybackRequiresUserGesture(false);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String host = uri.getHost();

                // PDF tidak bisa dibuka WebView -> buka eksternal
                if (isPdf(uri)) {
                    return openExternal(uri);
                }
                // Link internal (non-PDF) tetap di WebView
                if (host != null && host.equals(APP_HOST)) {
                    return false;
                }
                // Link lain buka di browser eksternal
                return openExternal(uri);
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                WebView.HitTestResult result = view.getHitTestResult();
                String url = result.getExtra();

                if (url != null && !url.isEmpty()) {
                    Uri uri = Uri.parse(url);
                    if (isPdf(uri) || uri.getHost() == null || !uri.getHost().equals(APP_HOST)) {
                        openExternal(uri);
                    } else {
                        webView.loadUrl(url);
                    }
                } else {
                    WebView tempWebView = new WebView(view.getContext());
                    tempWebView.setWebViewClient(new WebViewClient() {
                        @Override
                        public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest request) {
                            Uri uri = request.getUrl();
                            if (isPdf(uri) || uri.getHost() == null || !uri.getHost().equals(APP_HOST)) {
                                openExternal(uri);
                            } else {
                                webView.loadUrl(uri.toString());
                            }
                            return true;
                        }
                    });
                    WebViewTransport transport = (WebViewTransport) resultMsg.obj;
                    transport.setWebView(tempWebView);
                    resultMsg.sendToTarget();
                }
                return true;
            }
        });

        webView.loadUrl(APP_URL);

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack();
                } else {
                    finish();
                }
            }
        });
    }
}
